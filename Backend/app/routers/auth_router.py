from fastapi import APIRouter, HTTPException,Header, Depends
from bson import ObjectId
from ..schemas.user_schema import UserSignup, UserLogin
from ..database import db
from app.core.security import hash_password, verify_password
from app.utils.jwt_handler import create_token ,decode_token

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])

def get_current_user(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(401, "Authorization header missing")
    token = authorization.split(" ")[1]
    return decode_token(token)["user_id"]

@router.post("/signup")
async def signup(payload: UserSignup):
   
    exist = await db.users.find_one({"email": payload.email})
    if exist:
        raise HTTPException(400, "Email already exists")

    hashed = hash_password(payload.password)

    user_doc = {
        "username": payload.username,
        "email": payload.email,
        "password": hashed
    }

    res = await db.users.insert_one(user_doc)
    return {
        "msg": "Signup successful", 
       "user_id": str(res.inserted_id),
        "username": payload.username,
        "email": payload.email
        }


@router.post("/login")
async def login(payload: UserLogin):
    user = await db.users.find_one({"email": payload.email})
    if not user:
        raise HTTPException(401, "Invalid credentials")

    if not verify_password(payload.password, user["password"]):
        raise HTTPException(401, "Incorrect password")

    token = create_token({"user_id": str(user["_id"])})

    return {"msg": "Login successful", "token": token}

@router.get("/profile")
async def profile(user_id: str = Depends(get_current_user)):
    try:
        user = await db.users.find_one(
            {"_id": ObjectId(user_id)},
            {"password": 0}  # Exclude password
        )

        if not user:
            raise HTTPException(404, "User not found")

        # Convert ObjectId to string
        user["_id"] = str(user["_id"])

        return {
            "status": "success",
            "user": {
                "id": user["_id"],
                "username": user["username"],
                "email": user["email"]
            }
        }

    except Exception as e:
        raise HTTPException(500, f"Server error: {str(e)}")
