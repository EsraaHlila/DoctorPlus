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
import PreviousAppointments from "./pages/profile/PreviousAppointments";
import UpcomingAppointments from "./pages/profile/UpcomingAppointments";
import Error_signin from "./pages/profile/error_signin";
import ForgotPassword from "./pages/ForgotPassword";
import DoctorProfile from "./pages/DoctorProfile";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./pages/ProtectedRoute";




function App() {
  return (
    <div>
    <Router>
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/error_signin" element={<Error_signin />} />
        <Route path="/profile" element={<ProtectedRoute>  <Profile />  </ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute>   <HomePage />   </ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute>  <SettingsPage />   </ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute>   <HelpPage />  </ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute> <AppointmentsPage />  </ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about-us" element={<DoctorProfile />} />
        <Route path="/pre" element={<ProtectedRoute>  <PreviousAppointments />  </ProtectedRoute>} />
        <Route path="/up" element={<ProtectedRoute>   <UpcomingAppointments />  </ProtectedRoute>} />
        <Route path="/contact" element={<ContactUs />} />



      </Routes>
    </Router>
    </div>
  );
}

export default App;