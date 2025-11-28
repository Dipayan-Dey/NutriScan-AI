# test.py
from app.core.config import settings

print(settings.MONGO_URI)
print(settings.HF_API_TOKEN)
print(settings.JWT_SECRET)
