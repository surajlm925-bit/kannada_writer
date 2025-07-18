import google.generativeai as genai

# Initialize Gemini model (singleton)
model = genai.GenerativeModel("models/gemini-1.5-flash")

class Breaking:
    """
    Breaking model for generating breaking news in Kannada using Gemini 1.5 API
    
    Attributes:
        name (str): Name of the breaking component
        config (dict): Configuration settings
    """
    
    def __init__(self, name: str = "Breaking News Generator", config: dict = None):
        self.name = name
        self.config = config or {}
        
    def execute(self, kannada_input: str, max_lines: int = 4) -> str:
        """
        Generate breaking news from Kannada input
        
        Args:
            kannada_input (str): Input text in Kannada
            max_lines (int): Number of lines to generate (default: 4)
            
        Returns:
            str: Generated breaking news in Kannada
        """
        prompt = (
            f"ನೀಡಿರುವ ಕನ್ನಡ ಇನ್ಪುಟ್ ಆಧಾರದ ಮೇಲೆ {max_lines} ಸಾಲುಗಳ ಬ್ರೇಕಿಂಗ್ ನ್ಯೂಸ್ ರಚಿಸಿ:\n"
            f"{kannada_input}\n\n"
            "ಔಟ್ಪುಟ್:"
        )
        
        response = model.generate_content(prompt)
        return response.text
