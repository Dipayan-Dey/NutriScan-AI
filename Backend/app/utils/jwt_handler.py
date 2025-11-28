from app.core.config import settings

SECRET_KEY = settings.JWT_SECRET
from datetime import datetime, timedelta
from jose import jwt
# from ..config import settings

SECRET_KEY = settings.JWT_SECRET
ALGORITHM = "HS256"

def create_token(data: dict):
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(hours=8)
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
