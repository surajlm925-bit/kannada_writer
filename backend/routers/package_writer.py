from fastapi import APIRouter, Body
from pydantic import BaseModel
from typing import Optional
import google.generativeai as genai
import re

router = APIRouter()

model = genai.GenerativeModel("models/gemini-1.5-flash")

class PackageRequest(BaseModel):
    text: str
    category: Optional[str] = None

def generate_content(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else "No response from Gemini."
    except Exception as e:
        return f"Error: {str(e)}"

@router.post("/", include_in_schema=True)
@router.post("", include_in_schema=False)  # Handle both with and without trailing slash
def generate_package(request: PackageRequest):
    text = request.text.strip()
    category = request.category or "general"

    # Prompts — you can later make this more category-aware
    short_av_prompt = f"""
ನೀವು ಕನ್ನಡ ಸುದ್ದಿಗಾರರಾಗಿದ್ದೀರಿ. ಕೆಳಗಿನ ಮಾಹಿತಿ ಆಧಾರದ ಮೇಲೆ 3-4 ಲೈನ್ ಶಾರ್ಟ್ AV ಟೀಕಾ ಬರೆಯಿರಿ:

{text}

Short AV:
    """

    package_prompt = f"""
ನೀವು ಕನ್ನಡ ಸುದ್ದಿ ಮಾಧ್ಯಮದ ಪ್ಯಾಕೇಜ್ ಬರೆಯುವ ವರದಿಗಾರರಾಗಿದ್ದೀರಿ. ಈ ಮಾಹಿತಿಯ ಆಧಾರದಲ್ಲಿ ಪ್ಯಾಕೇಜ್ ಬರೆಯಿರಿ:

{text}

Package Script:
    """

    av_output = generate_content(short_av_prompt)
    pkg_output = generate_content(package_prompt)

    return {
        "category": category,
        "short_av": av_output,
        "package": pkg_output
    }
