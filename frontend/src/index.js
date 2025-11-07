import 'bootstrap/dist/css/bootstrap.min.css';  // ✅ Add this line
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
);
