from pydantic import BaseModel

class DietInput(BaseModel):
    disease: str | None = None
    problem: str | None = None
    diet_text: str | None = None

class CustomPromptInput(BaseModel):
    prompt: str
