from fastapi import APIRouter, Depends, Header, HTTPException
from ..schemas.diet_schema import DietInput, CustomPromptInput
from ..database import db
from app.utils.jwt_handler import decode_token
from ..services.ml_service import call_diet_analysis, call_model_with_prompt
import datetime

router = APIRouter(prefix="/api/v1/diet", tags=["Diet"])


def get_current_user(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(401, "Authorization header missing")
    token = authorization.split(" ")[1]
    return decode_token(token)["user_id"]


@router.post("/analyze")
async def analyze(payload: DietInput, user_id: str = Depends(get_current_user)):

    # Save raw diet input
    diet_doc = {
        "user_id": user_id,
        "disease": payload.disease,
        "problem": payload.problem,
        "diet_text": payload.diet_text,
        "created_at": datetime.datetime.utcnow()
    }

    raw_res = await db.diet.insert_one(diet_doc)

    # Generate analysis
    result = call_diet_analysis(payload.diet_text, payload.disease)

    # Save analysis in DB
    analysis_doc = {
        "user_id": user_id,
        "diet_id": str(raw_res.inserted_id),
        "analysis": result,
        "created_at": datetime.datetime.utcnow()
    }

    await db.analysis.insert_one(analysis_doc)

    return {"status": "success", "analysis": result}

@router.get("/history-analysis")
async def get_history(user_id: str = Depends(get_current_user)):
    """Fetch diet analysis history for the user"""

    cursor = db.analysis.find({"user_id": user_id}).sort("created_at", -1)
    history = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        history.append(doc)

    return {"status": "success", "history": history}

@router.get("/diet-history")
async def get_diet_history(user_id: str = Depends(get_current_user)):
    """Fetch diet input history for the user"""

    cursor = db.diet.find({"user_id": user_id}).sort("created_at", -1)
    history = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        history.append(doc)

    return {"status": "success", "history": history}

@router.get("/stats")
async def get_stats(user_id: str = Depends(get_current_user)):
    """Get diet analysis statistics for the user"""

    diet_count = await db.diet.count_documents({"user_id": user_id})
    analysis_count = await db.analysis.count_documents({"user_id": user_id})

    return {
        "status": "success",
        "stats": {
            "total_diets_submitted": diet_count,
            "total_analyses_generated": analysis_count
        }
    }

@router.get("/health-tracker-data")
async def get_health_tracker_data(user_id: str = Depends(get_current_user)):
    """Fetch data for health tracker visualization"""

    cursor = db.analysis.find({"user_id": user_id}).sort("created_at", 1)
    tracker_data = []
    async for doc in cursor:
        tracker_data.append({
            "date": doc["created_at"].strftime("%Y-%m-%d"),
            "analysis_summary": doc["analysis"][:100]  # First 100 chars as summary
        })

    return {"status": "success", "tracker_data": tracker_data}


@router.post("/custom")
async def custom_prompt(
    payload: CustomPromptInput, 
    authorization: str = Header(None)
):
    """
    Custom prompt endpoint.
    Requires a valid JWT token.
    Does NOT store in DB.
    """

    # --- Token Validation ---
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization token missing")

    try:
        token = authorization.split(" ")[1]
        decoded = decode_token(token)
        user_id = decoded["user_id"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


    # --- Call AI Model ---
    result = call_model_with_prompt(payload.prompt)
    print("Custom Prompt Result:", result)
    # --- Return Response ---
    return {
        "status": "success",
        "user_id": user_id,
        "response": result
    }
