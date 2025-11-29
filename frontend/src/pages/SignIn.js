import React from "react";
import bgImage from '../your-image.jpg';
import "./SignIn.css";

export default function Login() {
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
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>

      <div className="right-side">
        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <h2 className="login-title">Log In To Your Account</h2>

        <form className="login-form">
          <div className="input-group">
            <input type="text" placeholder="Username" />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Show my password
            </label>
            <a href="#" className="forgot">Forgot Password?</a>
          </div>
          <button className="btn-login">Sign In</button>

          <p className="or-text">Or sign in using</p>
          <div className="social-buttons">
            <img src="google.png" alt="Google" className="social-icon" />
            <img src="facebook.png" alt="Facebook" className="social-icon" />
            <img src="twitter.png" alt="Twitter" className="social-icon" />
          </div>

        </form>
      </div>
    </div>
  );
}
