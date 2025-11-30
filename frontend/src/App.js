import './App.css';
import './index.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile/ProfilePage";
import HomePage from "./pages/HomePage"
import SettingsPage from "./pages/profile/SettingsPage";
import HelpPage from "./pages/profile/HelpPage";
import AppointmentsPage from "./pages/profile/AppointmentsPage";


function App() {
  return (
    <div>
    <Router>
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />


      </Routes>
    </Router>
    </div>
  );
}

export default App;
