import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleReset = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!email || !newPassword || !confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }), // <-- corrected
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Email not found.");
      return;
    }

    setMessage("Password successfully updated!");
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => navigate("/"), 2000); // redirect to login
  } catch (err) {
    console.error(err);
    setError("Server error. Try again later.");
  }
};


  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <p>Enter your email and new password.</p>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn-submit">Reset Password</button>
        </form>

        {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <p style={{ marginTop: "20px" }}>
          Remembered your password? <span onClick={() => navigate("/")} style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
        </p>
      </div>
    </div>
  );
}
