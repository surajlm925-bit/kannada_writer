import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserInterface from "./pages/UserInterface";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserInterface />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
