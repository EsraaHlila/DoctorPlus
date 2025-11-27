import React from "react";
import bgImage from '../your-image.jpg';
import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="login-container">

      <div className="left-side">
        <img src={bgImage} alt="Background" className="left-image" />
        <div className="left-overlay">
          <h2 className="new">Welcome!</h2>
          <p className="welcome-title">If you already have an account, please sign in below</p>
          <button className="btn-login-left">Sign In</button>
        </div>
      </div>

      <div className="right-side">

        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <h2 className="login-title">Sign Up For An Account</h2>

        <form className="login-form">
          <div className="input-group">
            <input type="text" placeholder="Full Name" />
          </div>

          <div className="input-group">
            <input type="tel" placeholder="Phone Number" />
          </div>

          <div className="input-group">
            <input type="email" placeholder="Email" />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>

          <label className="terms-box">
            <input type="checkbox" /> I accept the Terms & Conditions
          </label>

          <button className="btn-login">Sign Up</button>

          <p className="or-text">Or sign up using</p>

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
