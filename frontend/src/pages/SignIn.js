import React, { useState } from "react";
import bgImage from '../your-image.jpg';
import "./SignIn.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/home");   // redirect logged in users
    }
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials.");
        return;
      }

      // Save tokens if your backend returns them
      localStorage.setItem("accessToken", data.accessToken || "");
      localStorage.setItem("refreshToken", data.refreshToken || "");
      localStorage.setItem("user", JSON.stringify(data.user || {}));

      navigate("/home"); // redirect on success

    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img
          src={bgImage}
          alt="Background"
          className="left-image"
        />
        <div className="left-overlay">
          <h2 className="new">Welcome!</h2>
          <p className="welcome-title">New Here? Sign Up and Reserve Your Appointment</p>

          <Link to="/signup">
            <button className="btn-login-left">Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="right-side">

        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <h2 className="login-title">Sign In To Your Account</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              /> Show my password
            </label>
            <a href="forgot-password" className="forgot">Forgot Password?</a>
          </div>


          <button type="submit" className="btn-login">Sign In</button>

          {/* Error message below button */}
          {error && (
            <p style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}>
              {error}
            </p>
          )}

          <p className="or-text">Or sign in using</p>
          <div className="social-buttons">
            <img src="google.png" alt="Google" className="social-icon" />
            <img src="facebook.png" alt="Facebook" className="social-icon" />
            <img src="twitter.png" alt="Twitter" className="social-icon" />
          </div>

          <p style={{ marginTop: "20px", textAlign: "center" }}>
            <Link to="/about-us" style={{ color: "#007bff" }}>About Us</Link>
          </p>


        </form>
      </div>
    </div>
  );
}
