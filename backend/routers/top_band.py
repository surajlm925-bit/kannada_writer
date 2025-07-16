from fastapi import APIRouter, Body
from pydantic import BaseModel
from typing import Optional
import re
import google.generativeai as genai

# Initialize Gemini model (singleton)
model = genai.GenerativeModel("models/gemini-1.5-flash")

router = APIRouter()

# Define valid categories
CATEGORIES = {
    "politics": "ರಾಜಕೀಯ",
    "infrastructure": "ಮೂಲಭೂತ ಸೌಕರ್ಯ ಸುದ್ದಿ",
    "accidents": "ಅಪಘಾತ ಸುದ್ದಿಗಳು",
    "crime": "ಕ್ರೈಂ ಸುದ್ದಿಗಳು",
    "cinema": "ಸಿನಿಮಾ ಸುದ್ದಿಗಳು",
    "culture": "ಸಾಂಸ್ಕೃತಿಕ/ಸಾಮಾನ್ಯ ಸುದ್ದಿ"
}

# Prompt templates by category
PROMPT_TEMPLATES = {
    "politics": {
        "b_style": """
ನೀವು ಕನ್ನಡ ಸುದ್ದಿ ಮಾಧ್ಯಮದ ವರದಿಗಾರರಾಗಿದ್ದೀರಿ. ಈ ಸುದ್ದಿ ರಾಜಕೀಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ್ದು, ಇದನ್ನು ಆಧರಿಸಿ ಕೆಳಗಿನ ಸೂಚನೆಗಳಂತೆ ವರದಿ ಬರೆಯಿರಿ:

1. 5W1H ಮಾದರಿಯಲ್ಲಿ ಬರೆಯಬೇಕು (ಯಾರು, ಏನು, ಎಲ್ಲಿದೆ, ಯಾವಾಗ, ಯಾಕೆ, ಹೇಗೆ).
2. ಶೈಲಿ: ಗ್ರಾಂಥಿಕ, ನಿರ್ದಿಷ್ಟ, ಮಾಹಿತಿಯುಳ್ಳ.
3. ಒಂದು ನಿರೂಪಣಾತ್ಮಕ ಸುದ್ದಿ ವರದಿ ಆಗಿರಬೇಕು.
4. ಎಡಿಟೋರಿಯಲ್ ಶೈಲಿ ಅಥವಾ ಅಭಿಪ್ರಾಯ ಇರಬಾರದು.
5. ಕೊನೆಗೆ ಸ್ಥಳವನ್ನು (Location) ಪ್ರತ್ಯೇಕವಾಗಿ ಕೊಡಬೇಕು.

ಇನ್‌ಪುಟ್:
{input_text}

Script:
        """,
        "c_style": """
ಈ ಸುದ್ದಿ ರಾಜಕೀಯ ವಿಭಾಗಕ್ಕೆ ಸೇರಿದೆ. ಟಾಪ್ ಬ್ಯಾಂಡ್ ರಚಿಸಿ:

1. ಒಟ್ಟು 6 ಶೀರ್ಷಿಕೆಗಳು.
2. ಪ್ರತಿ ಶೀರ್ಷಿಕೆಗೆ 10-15 ಪದಗಳು.
3. ಘಟನೆಯ ಪ್ರತ್ಯೇಕ ಅಂಶವನ್ನು ವಿವರಿಸಬೇಕು.
4. ಪ್ಯಾರಾಗ್ರಾಫ್ ಅಥವಾ ಸಂಕ್ಷಿಪ್ತ ರೂಪ ಬೇಡ.

Top Band:
        """
    },
    "infrastructure": {
        "b_style": """
ನೀವು ಮೂಲಭೂತ ಸೌಕರ್ಯ ಸಂಬಂಧಿತ ಸುದ್ದಿಗಾಗಿ ವರದಿ ಬರೆಯುತ್ತಿದ್ದೀರಿ. ಕೆಳಗಿನ ಪ್ರಾಂಪ್ಟ್ ಆಧಾರಿಸಿ ಪೂರ್ಣ ಸ್ಕ್ರಿಪ್ಟ್ ಬರೆಯಿರಿ:

1. ಮಾಹಿತಿ ಉಳ್ಳದು, ನಿರ್ದಿಷ್ಟವಾದ ವರದಿ ಇರಲಿ.
2. ಶೈಲಿ: ಸರಳ, ನಿರೂಪಣಾತ್ಮಕ, ಗ್ರಾಂಥಿಕ.
3. ಕೊನೆಗೆ ಸ್ಥಳವನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಸೂಚಿಸಿ.

ಇನ್‌ಪುಟ್:
{input_text}

Script:
        """,
        "c_style": """
ಈ ಸುದ್ದಿ ಮೂಲಭೂತ ಸೌಕರ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದದ್ದು. ಟಾಪ್ ಬ್ಯಾಂಡ್ ಬರೆಯಿರಿ:

1. 6 ಲೈನ್‌ಗಳು ಮಾತ್ರ.
2. ಪ್ರತಿಯೊಂದು ವಿಷಯವನ್ನು ವಿಭಜಿಸಿ.
3. ಯಾವುದೇ ಪುನರಾವೃತ್ತಿ ಇಲ್ಲದಂತೆ.

Top Band:
        """
    },
    "accidents": {
        "b_style": """
ನೀವು ಅಪಘಾತ/ಹೆದ್ದಾರಿ ಘಟನೆ ಕುರಿತ ವರದಿಗಾರರಾಗಿದ್ದೀರಿ. ಈ ಘಟನೆಯ ಆಧಾರದಲ್ಲಿ ವರದಿ ರಚಿಸಿ:

1. ಸಮಯ, ಸ್ಥಳ, ಕಾರಣ, ಗಾಯಗಳು ಅಥವಾ ಸಾವುಗಳನ್ನು ಒಳಗೊಂಡಿರಲಿ.
2. ಶೈಲಿ: ಸ್ಪಷ್ಟ, ಗ್ರಾಂಥಿಕ.
3. ಕೊನೆಗೆ ಸ್ಥಳವನ್ನು ನೀಡಬೇಕು.

ಇನ್‌ಪುಟ್:
{input_text}

Script:
        """,
        "c_style": """
ಈ ಸುದ್ದಿ ಅಪಘಾತ ಘಟನೆಯ ಬಗ್ಗೆ. ಟಾಪ್ ಬ್ಯಾಂಡ್ ಬರೆಯಿರಿ:

1. ಪ್ರತಿ ಲೈನ್‌ ಒಂದು ಪ್ರಮುಖ ಮಾಹಿತಿ.
2. 6-7 ಶೀರ್ಷಿಕೆಗಳು.

Top Band:
        """
    },
    "crime": {
        "b_style": """
ನೀವು ಕ್ರೈಂ ವರದಿಗಾರರಾಗಿದ್ದೀರಿ. ಈ ಕೃತ್ಯವು ನ್ಯಾಯ, ತನಿಖೆ, ಬಂಧನ ಅಥವಾ ಗಂಭೀರ ತಪ್ಪುಗಳ ಬಗ್ಗೆ ಇದ್ದರೆ:

1. ಶೈಲಿ: ನಿಷ್ಪಕ್ಷಪಾತ, ಮಾಹಿತಿ ಆಧಾರಿತ.
2. ಯಾವುದೇ ಅಭಿಪ್ರಾಯ ಇಲ್ಲದಿರಲಿ.
3. ಸ್ಥಳವನ್ನು ಕೊನೆಗೆ ತಿಳಿಸಿ.

ಇನ್‌ಪುಟ್:
{input_text}

Script:
        """,
        "c_style": """
ಈ ಸುದ್ದಿ ಕ್ರೈಂ ವಿಭಾಗಕ್ಕೆ ಸೇರಿದೆ. ಟಾಪ್ ಬ್ಯಾಂಡ್ ರಚಿಸಿ:

1. ಶೀರ್ಷಿಕೆ ಪ್ರತಿ ಘಟನೆಯ ಮೌಲ್ಯವನ್ನು ವಿವರಿಸಲಿ.
2. 6 ವಾಕ್ಯಗಳು ಮಾತ್ರ.

Top Band:
        """
    },
    "cinema": {
        "b_style": """
ನೀವು ಚಲನಚಿತ್ರ ಸಂಬಂಧಿತ ಸುದ್ದಿ ಬರೆಯುತ್ತಿದ್ದೀರಿ. ಈ ಸುದ್ದಿ ಯಾವ ನಟ, ಸಿನಿಮಾಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ್ದಾದರೂ:

1. ಶೈಲಿ: ಚಿತ್ರಮಂದಿರ ಶೈಲಿ, ಆದರೆ ಮಾಹಿತಿ ಉಳ್ಳದು.
2. ಯಾವುದೇ ಗಾಸಿಪ್ ಅಥವಾ ಅಭಿಪ್ರಾಯ ಬೇಡ.
3. ಸ್ಥಳ ಅಂತಿಮವಾಗಿ.

ಇನ್‌ಪುಟ್:
{input_text}

Script:
        """,
        "c_style": """
ಈ ಸುದ್ದಿ ಚಿತ್ರರಂಗಕ್ಕೆ ಸಂಬಂಧಿಸಿದದ್ದು. ಟಾಪ್ ಬ್ಯಾಂಡ್ ಬರೆಯಿರಿ:

1. ಚಿತ್ರ, ನಟ, ಘಟನೆ ಪ್ರತ್ಯೇಕವಾಗಿ.

Top Band:
        """
    },
    "culture": {
        "b_style": """
ನೀವು ಸಾಂಸ್ಕೃತಿಕ ಘಟನೆ, ಹಬ್ಬ, ಉತ್ಸವ ಕುರಿತ ವರದಿ ಬರೆಯುತ್ತಿದ್ದೀರಿ. ಶೈಲಿ: ಶಿಸ್ತಿನ ಮಾಹಿತಿ, ನಿರೂಪಣಾತ್ಮಕ.

1. ಘಟನೆಯ ಹಿನ್ನೆಲೆ, ಸ್ಥಳ, ಸಮಯ, ಮಹತ್ವ.
2. ಕೊನೆಗೆ ಸ್ಥಳದ ಹೆಸರು.

ಇನ್‌ಪುಟ್:
{input_text}

Script:
        """,
        "c_style": """
ಈ ಸುದ್ದಿ ಸಾಂಸ್ಕೃತಿಕ ಘಟನೆಯನ್ನು ವಿವರಿಸುತ್ತದೆ. ಟಾಪ್ ಬ್ಯಾಂಡ್ ರಚಿಸಿ:

1. ಉತ್ಸವದ ಪ್ರತಿ ಅಂಶಕ್ಕೆ ಒಂದೊಂದು ಲೈನ್.
2. ಪ್ಯಾರಾಗ್ರಾಫ್ ಬೇಡ.

Top Band:
        """
    }
}


class TopBandRequest(BaseModel):
    text: str
    category: Optional[str] = None

def identify_category(text: str) -> str:
    text_lower = text.lower()
    if "ರಾಜಕೀಯ" in text_lower or "ಸಿಎಂ" in text_lower or "ಸಚಿವ" in text_lower or "ಪಕ್ಷ" in text_lower:
        return "politics"
    if "ನೀರು" in text_lower or "ರಸ್ತೆ" in text_lower or "ಆಸ್ಪತ್ರೆ" in text_lower:
        return "infrastructure"
    if "ಅಪಘಾತ" in text_lower or "ಸಾವು" in text_lower or "ಗಾಯ" in text_lower:
        return "accidents"
    if "ಕೊಲೆ" in text_lower or "ಅಪರಾಧ" in text_lower or "ಪೊಲೀಸ್" in text_lower:
        return "crime"
    if "ಸಿನಿಮಾ" in text_lower or "ನಟ" in text_lower or "ಚಿತ್ರ" in text_lower:
        return "cinema"
    if any(word in text_lower for word in ["ಹಬ್ಬ", "ಆಚರಣೆ", "ಸಂಭ್ರಮ"]):
        return "culture"
    return "culture"

def extract_location(text: str) -> str:
    known = ["ಬೆಂಗಳೂರು", "ಮೈಸೂರು", "ಮಂಡ್ಯ", "ಬೆಳಗಾವಿ", "ದಾವಣಗೆರೆ"]
    for city in known:
        if city in text:
            return city
    return "ನಿರ್ದಿಷ್ಟಪಡಿಸಿಲ್ಲ"

def generate_content(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else "ರಚನೆ ವಿಫಲವಾಗಿದೆ"
    except Exception as e:
        return f"ದೋಷ: {str(e)}"

@router.post("/")
def generate_script_and_top_band(request: TopBandRequest):
    text = request.text.strip()
    category_key = request.category or identify_category(text)

    if category_key not in PROMPT_TEMPLATES:
        return {"error": "Category not supported."}

    b_prompt = PROMPT_TEMPLATES[category_key]["b_style"].replace("{input_text}", text)
    b_output = generate_content(b_prompt)

    # Extract script
    script_match = re.search(r"Script:\s*(.*?)(?:Location:|$)", b_output, re.DOTALL)
    script = script_match.group(1).strip() if script_match else b_output

    # Extract location
    loc_match = re.search(r"Location:\s*(.*)", b_output)
    gemini_loc = loc_match.group(1).strip() if loc_match else ""
    location = extract_location(text) or gemini_loc

    c_prompt = PROMPT_TEMPLATES[category_key]["c_style"].replace("{input_text}", text)
    c_output = generate_content(c_prompt)

    band_match = re.search(r"Top Band:\s*(.*)", c_output, re.DOTALL)
    top_band = "\n".join(
        [line.strip() for line in band_match.group(1).splitlines() if line.strip()]
    ) if band_match else "ಟಾಪ್ ಬ್ಯಾಂಡ್ ಲಭ್ಯವಿಲ್ಲ."

    return {
        "category": category_key,
        "script": script,
        "top_band": top_band,
        "location": location
    }
