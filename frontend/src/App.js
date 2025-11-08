import './App.css';
import './index.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile/Profile";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
