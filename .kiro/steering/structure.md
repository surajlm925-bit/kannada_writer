# Project Structure & Organization

## Root Directory
- `.kiro/`: Contains steering files for AI assistance
- `.venv/`: Python virtual environment (not committed to git)
- `backend/`: FastAPI backend application
- `frontend/`: React frontend application
- `core/`: Core functionality shared across the application
- `routers/`: API route modules
- `tests/`: Test files for the application
- `main.py`: Main application entry point
- `config.json`: Application configuration
- `requirements.txt`: Python dependencies

## Backend Structure
- `backend/main.py`: FastAPI application initialization
- `backend/config.json`: Module configuration
- `backend/config.py`: Configuration loading utilities
- `backend/database.py`: Database connection handling
- `backend/models/`: Data models and schemas
- `backend/routers/`: API endpoint implementations
  - Each content module has its own router file
- `backend/.env`: Environment variables (not committed to git)

## Frontend Structure
- `frontend/src/`: Source code for React components
- `frontend/public/`: Static assets
- `frontend/vite.config.ts`: Vite configuration
- `frontend/tailwind.config.js`: Tailwind CSS configuration
- `frontend/components.json`: Component configuration

## Module Pattern
Each content generation module follows this pattern:
1. Defined as a router in `routers/[module_name].py`
2. Enabled/disabled via `config.json`
3. Dynamically loaded by `core/module_loader.py`
4. Tested in `tests/test_[module_name].py`

## API Structure
All endpoints follow RESTful conventions:
- `POST /[module_name]/`: Generate content for that module
- Response format is consistent across modules
- Error handling follows standard HTTP status codes

## Testing Structure
- `tests/conftest.py`: Common test fixtures
- `tests/test_*.py`: Individual test modules
- Tests use pytest with FastAPI TestClient