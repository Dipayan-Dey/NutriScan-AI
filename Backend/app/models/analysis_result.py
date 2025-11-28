from pydantic import BaseModel

class DietModel(BaseModel):
    user_id: str
    disease: str | None = None
    problem: str | None = None
    diet_text: str
    analysis: str | None = None
