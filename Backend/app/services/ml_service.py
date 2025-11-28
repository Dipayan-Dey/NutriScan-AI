from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

def call_model_with_prompt(prompt: str):
    """Send custom prompt directly to Groq"""
    response = client.chat.completions.create(
        model=settings.MODEL_NAME,  # llama-3.3-70b-versatile
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=400,
    )
    return response.choices[0].message.content


def call_diet_analysis(diet_text: str, disease: str = None):
    """Default diet analysis prompt (this result is stored in DB)"""

    prompt = f"""
You are a professional diet and nutrition expert.

Patient disease/condition: {disease}
Diet chart provided:
{diet_text}

Analyze and return the following in clean readable format:

1. Summary of the diet
2. Preferred healthy foods
3. Recommended food quantities (simple English)
4. Foods to avoid
5. Final actionable recommendation
"""

    return call_model_with_prompt(prompt)
