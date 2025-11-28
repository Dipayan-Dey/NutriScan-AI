from fastapi import FastAPI
from .routers import auth_router, diet
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Allowed frontend
    allow_credentials=True,
    allow_methods=["*"],            # GET, POST, PUT, DELETE
    allow_headers=["*"],            # Authorization, Content-Type, etc
)
app.include_router(auth_router.router)
app.include_router(diet.router)

@app.get("/")
def home():
    return {"message": "Diet Analyzer API Running"}
