# Technology Stack & Development Guidelines

## Backend
- **Framework**: FastAPI
- **Language**: Python 3.x
- **AI Integration**: Google Gemini API (configured via environment variables)
- **Module System**: Dynamic module loading via `core/module_loader.py`

## Frontend
- **Framework**: React 19.x
- **Build Tool**: Vite 7.x
- **Styling**: Tailwind CSS 4.x
- **Component Library**: Custom components with Radix UI primitives

## Common Commands

### Backend Development
```powershell
# Setup virtual environment
cd backend
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload

# Run with network access
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Development
```powershell
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Testing
```powershell
# Run tests
pytest tests/
```

## Configuration
- Backend modules are configured in `config.json` with boolean flags
- Environment variables are stored in `backend/.env` (not committed to git)
- Required environment variables:
  - `GEMINI_API_KEY`: API key for Google Gemini

## Code Style
- Python: Follow PEP 8 guidelines
- JavaScript/TypeScript: ESLint configuration provided in project
- Use TypeScript for new frontend components
- Maintain consistent error handling patterns in API endpoints