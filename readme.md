kannada-content-bot/
├── backend/
│   ├── main.py               # Main FastAPI app
│   ├── routers/
│   │   ├── top_band.py       # Function 1
│   │   ├── package_writer.py # Function 2
│   │   ├── speed_50.py       # Function 3
│   │   └── __init__.py       # Dynamic router import
│   ├── core/
│   │   ├── module_loader.py  # Loads functions dynamically
│   │   └── config.json       # Function access per user/client
│   └── models.py             # (Optional) user model, permissions
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── AdminPanel.jsx
│   │   │   └── UserInterface.jsx
│   │   └── components/
│   └── tailwind.config.js
└── README.md



