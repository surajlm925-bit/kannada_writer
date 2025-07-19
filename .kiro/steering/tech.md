# Technology Stack

## Backend

- **Framework**: FastAPI
- **Language**: Python 3
- **Key Libraries**:
  - FastAPI for API endpoints
  - Uvicorn for ASGI server
  - Google Generative AI for Gemini integration
  - Pydantic for data validation

## Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **UI Components**:
  - Radix UI primitives
  - Tailwind CSS for styling
- **Language**: TypeScript/JavaScript

## Common Commands

### Backend Development

```bash
# Setup virtual environment
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run development server
uvicorn main:app --reload
# Run with network access
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Development

```bash
# Install dependencies
cd frontend
npm install
# Start development server
npm run dev
# Build for production
npm run build
# Preview production build
npm run preview
# Lint code
npm run lint
```

## API Endpoints

- `POST /top_band/`: Generates Kannada news headline blocks
- `POST /package_writer/`: Creates Kannada AV packages
- `POST /speed_50/`: Generates news lines in Kannada

## Configuration

- Module activation is controlled via `config.json`
- Each function can be enabled/disabled by setting boolean values
