from fastapi import APIRouter, Body
from pydantic import BaseModel
from ..models.breaking import Breaking

router = APIRouter()

class BreakingInput(BaseModel):
    kannada_input: str
    max_lines: int = 4

@router.post("/breaking")
async def generate_breaking_news(input_data: BreakingInput = Body(...)):
    """Endpoint for generating breaking news from Kannada input"""
    generator = Breaking()
    result = generator.execute(
        kannada_input=input_data.kannada_input,
        max_lines=input_data.max_lines
    )
    return {"breaking_news": result}
