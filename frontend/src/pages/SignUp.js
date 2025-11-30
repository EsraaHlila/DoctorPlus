import React, { useState } from "react";
import bgImage from '../your-image.jpg';
import "./SignUp.css";
import { Link } from "react-router-dom";

export default function SignUp() {

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    birth_date: "",
    city: "",
    address: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Frontend validation
    const { name, phone_number, email, password, birth_date, city, address } = formData;

    if (!name || !phone_number || !email || !password || !birth_date || !city || !address) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\d+$/.test(phone_number)) {
      setError("Phone number must contain only digits.");
      return;
    }

    setError(""); // clear error if validation passed

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
        window.location.href = "/"; // Redirect to Sign In
      } else {
        setError(data.message || "Registration failed");
      }

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  }

  return (
    <div className="login-container">

      <div className="left-side">
        <img src={bgImage} alt="Background" className="left-image" />
        <div className="left-overlay">
          <h2 className="new">Welcome!</h2>
          <p className="welcome-title">If you already have an account, please sign in below</p>

          <Link to="/">
            <button className="btn-login-left">Sign In</button>
          </Link>
        </div>
      </div>

      <div className="right-side">

        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <h2 className="login-title">Sign Up For An Account</h2>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              name="phone_number"
              type="tel"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              name="birth_date"
              type="date"
              placeholder="Birth Date"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              name="city"
              type="text"
              placeholder="City"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              name="address"
              type="text"
              placeholder="Address"
              onChange={handleChange}
            />
          </div>

          <label className="terms-box">
            <input type="checkbox" /> I accept the Terms & Conditions
          </label>

          {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

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
