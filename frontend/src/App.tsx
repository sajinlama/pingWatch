import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/layout";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import TelegramConnect from "./components/telegramConnect";
import AddMonitor from "./components/addmonitor";
import Settings from "./components/settings";
import { ProtectedRoute } from "./components/protectedRoute";
import Notification from "./components/Notification";
import StartMonitoring from "./components/StartMonitoring";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes using ProtectedRoute layout component */}
          <Route element={<ProtectedRoute />}>
          <Route path="/telegram-connect" element={<TelegramConnect />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-monitor" element={<AddMonitor />} />
              <Route path="/settings" element={<Settings />} />
              <Route path = "/notification" element={<Notification/>}/>
              <Route path="/start-monitoring" element ={<StartMonitoring/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}