from fastapi import APIRouter, Body
from pydantic import BaseModel
from typing import List
import google.generativeai as genai

router = APIRouter()

model = genai.GenerativeModel("models/gemini-1.5-flash")

class SpeedRequest(BaseModel):
    headlines: List[str]

def generate_line_output(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else "Empty response"
    except Exception as e:
        return f"Error: {str(e)}"

@router.post("/", include_in_schema=True)
@router.post("", include_in_schema=False)  # Handle both with and without trailing slash
def generate_speed_50(request: SpeedRequest):
    results = []
    for i, line in enumerate(request.headlines[:50]):
        prompt = f"""
ನೀವು ಕನ್ನಡ ನ್ಯೂಸ್ ಸ್ಕ್ರಿಪ್ಟ್ ಬರೆಯುವ ಎಡಿಟರ್ ಆಗಿದ್ದೀರಿ. ಈ ಹೆಡ್ಲೈನ್ ಆಧಾರಿಸಿ ಒಂದು ಸಾಲಿನ ಸ್ಕ್ರಿಪ್ಟ್ ರಚಿಸಿ:

Headline: {line}
        """
        output = generate_line_output(prompt)
        results.append({
            "input": line,
            "output": output
        })

    return {"results": results}
