import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 👈 use App.js as the central router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
