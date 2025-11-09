import './App.css';
import './index.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile/Profile";
import HomePage from "./pages/HomePage"
import ErrorSignin from "./pages/profile/error_signin"

function App() {
  return (
    <div>
    <Router>
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/error_signin" element={<ErrorSignin />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
