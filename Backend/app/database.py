from app.core.config import settings
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DB_NAME]
