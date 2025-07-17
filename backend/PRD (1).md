
# Kannada AI Content Generator - Product Requirements

## Overview
A local AI-powered content generator for Kannada news, supporting multiple content types and dynamic model switching via Gemini 1.5/2.0 API.

---

## ✅ Features Implemented
- [x] FastAPI backend with modular routing
- [x] Gemini 1.5/2.0 model integration with `.env` support
- [x] React + Tailwind frontend (via Vite)
- [x] Dynamic module selection (Top Band, Package Writer, Speed 50)
- [x] Prompt-based generation with API routing
- [x] Working local development (WSL2)
- [x] Successful local UI rendering on `localhost:5173`

---

## 🔧 Issues Identified
- `\n` not formatting properly in output
- Output box missing scroll (overflow hidden)
- No dynamic model selector in UI yet (pending)
- Manual restart needed when `.env` or config changes
- UI lacks feedback loading state / error handling

---

## 📌 Next Tasks
1. 🧠 Fix newline rendering from Gemini (`\n`) to `<br/>` or `\n\n`
2. 🎛️ Add model selection dropdown in UI (map to backend `model` field)
3. 📜 Add scroll support and auto-resize for output box
4. 🔁 Auto restart FastAPI on `.env` config change (maybe `watchgod`)
5. 🚀 Setup static build pipeline for production (Nginx or Electron)
6. ✅ Add loading animation/spinner to button
