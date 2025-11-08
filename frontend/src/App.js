import './App.css';
import './index.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin+back";
import SignUp from "./pages/signup+back";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div>
    <Router>
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
