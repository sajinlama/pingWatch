import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import TelegramConnect from "./components/telegramConnect";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/telegram-connect" element={<TelegramConnect/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;