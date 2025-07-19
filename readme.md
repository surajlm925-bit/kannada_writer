# 📝 README

## 📌 Project Title:  
**Kannada AI Content Generator with Modular API + Local Web UI**

---

## 🔍 Purpose  
To develop a local-first, modular content generation platform in Kannada. It includes:
- AI-generated **Top Bands**, **Short Packages**, and **Speed-50** news bulletins
- A **FastAPI backend** that loads modules dynamically based on config
- A **React-based frontend** served over local network with UI access control

---

## 🎯 Goals

| ID  | Objective                                                    |
| --- | ------------------------------------------------------------ |
| G1  | Enable Kannada news content generation in multiple formats   |
| G2  | Modular API: Add/remove content types dynamically            |
| G3  | Web UI for both admin (function control) and end-users       |
| G4  | Run locally on shared network — no cloud dependency          |
| G5  | Support Gemini / OpenAI integration with category-based tone |

---

## 📦 Functional Modules

| Function       | Route                   | Description                                        |
| -------------- | ----------------------- | -------------------------------------------------- |
| Top Band       | `POST /top_band/`       | Generates a 6-line Kannada news headline block     |
| Package Writer | `POST /package_writer/` | Writes a short Kannada AV + package based on input |
| Speed 50       | `POST /speed_50/`       | Outputs 1 news line per input (up to 50 lines)     |

---

## 🧱 Architecture

### ⚙️ Backend (FastAPI)
- `main.py` loads enabled modules from `config.json`
- Each content module is a self-contained router (`routers/*.py`)
- `module_loader.py` dynamically imports only active routes

### 🖼 Frontend (React + Tailwind)
- Built using **Vite** with TypeScript
- Contains:
  - Configure API base URL via `.env` file: set `VITE_API_URL=http://localhost:8000`
  - `UserInterface.tsx`: for prompt + output UI
  - `AdminPanel.tsx`: for toggling functions per user
- Custom UI component library with:
  - Form components (FormLabel, FormHelperText, FormControl, FormGroup)
  - Input components (Input, Textarea, Select)
  - Button components with multiple variants and states
  - Support for Kannada text rendering
- Communicates with FastAPI via `fetch`

---

## 🧪 Local Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Vite Recommended)
```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm run dev
```
You can set the API URL by creating a `.env` file in the `frontend` directory:
```bash
echo "VITE_API_URL=http://localhost:8000" > .env
```

---

## 🌐 Local Access
- API: `http://localhost:8000/docs`
- UI: `http://localhost:5173`

To allow other devices on the network:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## Context7 MCP Setup

To enable advanced coding assistance, set up the Context7 MCP server:

1. Install Node.js if not already installed.
2. Run `npx -y @upstash/context7-mcp` in the project root.
3. Keep the server running while working on the project.

---

## 🔄 Git Versioning Setup

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git config user.name "Your Name"
git config user.email "your@email.com"

git add .
git commit -m "✅ Stable checkpoint: backend + UI ready"
git push --set-upstream origin master
```

---

## ⚠️ Known Issues & TODOs

| Status | Issue                                                                     |
| ------ | ------------------------------------------------------------------------- |
| ✅      | CRA replaced with Vite + TypeScript                                       |
| ✅      | Tailwind config integrated with custom UI component library               |
| 🟩      | Gemini API integration pending                                            |
| 🟩      | Hot reload unreliable when dynamic modules are used (may require restart) |

---

## ✅ Last Checkpoint Summary
- **Full-Stack Application Working** ✅
  - Backend: FastAPI with Gemini API integration
  - Frontend: React/Vite with beautiful UI
  - API Integration: CORS, environment variables, error handling
- **All 3 functions tested via FastAPI:**
  - Top Band ✅ (Script + Top Band generation)
  - Package Writer ✅
  - Speed 50 ✅
- **UI Features:**
  - Loading states with skeleton animations
  - Error handling and display
  - Kannada text support
  - Responsive design
- **Environment Setup:**
  - Backend: `.env` with GEMINI_API_KEY
  - Frontend: `.env` with VITE_API_URL
  - CORS configured for ports 5173 and 5174
- **Ready for production-ready UI tasks**