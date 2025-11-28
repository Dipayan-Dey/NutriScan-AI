from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str
    DB_NAME: str
    JWT_SECRET: str
    GROQ_API_KEY: str
    MODEL_NAME: str = "llama-3.3-70b-versatile"

    class Config:
        env_file = ".env"

settings = Settings()
