
# Dev Checklist: Kannada Writer AI

## ✅ Completed Milestones
- [x] .env-based model switching setup
- [x] Gemini 1.5 API integration with fallback
- [x] Modular FastAPI architecture (top_band, package_writer, speed_50)
- [x] React UI built with Vite and Tailwind
- [x] Input form + module dropdown works
- [x] Content successfully hitting endpoints
- [x] Verified UI/backend on `localhost:8000 + 5173`

---

## 🧩 Current Known Bugs
- [ ] Output text not formatting line breaks
- [ ] Output pane doesn't scroll for large responses
- [ ] UI doesn't show selected model used
- [ ] Restart required for every backend config update

---

## 🗂️ To-Do List
- [ ] Add `<select>` for Gemini model (from env or hardcoded)
- [ ] UI feedback (loading spinner, errors)
- [ ] Format AI response line breaks correctly
- [ ] Add `.env` hot reload support (optional)
- [ ] Refactor styles into separate Tailwind components
- [ ] SQLite or JSON logging (optional for shared hosting logs)
