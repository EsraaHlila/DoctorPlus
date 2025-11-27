import './App.css';
import './index.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile/ProfilePage";
import HomePage from "./pages/HomePage"
import PrivacyPolicyPage from "./pages/profile/PrivacyPolicyPage";
import SettingsPage from "./pages/profile/SettingsPage";
function App() {
  return (
    <div>
    <Router>
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
