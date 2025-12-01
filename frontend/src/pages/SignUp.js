import React, { useState } from "react";
import bgImage from '../your-image.jpg';
import "./SignUp.css";
import { Link } from "react-router-dom";
import  {  useEffect } from "react";
import { useNavigate } from "react-router-dom";





export default function SignUp() {
const navigate = useNavigate();
const [acceptedTerms, setAcceptedTerms] = useState(false);
const [termsError, setTermsError] = useState("");


useEffect(() => {
  if (localStorage.getItem("accessToken")) {
    navigate("/home");
  }
}, []);
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

  const { name, phone_number, email, password, birth_date, city, address } = formData;

  // Check empty fields
  if (!name || !phone_number || !email || !password || !birth_date || !city || !address) {
    setError("Please fill in all fields.");
    return;
  }

  // Validate phone number
  if (!/^\d+$/.test(phone_number)) {
    setError("Phone number must contain only digits.");
    return;
  }

  // Validate Terms
  if (!acceptedTerms) {
    setTermsError("You must accept the Terms & Conditions.");
    return;
  }

  setError("");
  setTermsError("");

  try {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      // Auto login
      const loginRes = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        localStorage.setItem("accessToken", loginData.accessToken);
        localStorage.setItem("refreshToken", loginData.refreshToken);
        localStorage.setItem("user", JSON.stringify(loginData.user));
        navigate("/home");
      } else {
        navigate("/");
      }

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
          <Link to="/about-us">
            <p style={{ marginTop: "15px", color: "white", textDecoration: "underline", cursor: "pointer" }}>
              About Us
            </p>
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
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                setTermsError("");
              }}
            />
            I accept the Terms & Conditions
          </label>

          {termsError && <p style={{ color: "red", marginTop: "4px" }}>{termsError}</p>}



          {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

          <button className="btn-login" /*disabled={!acceptedTerms}*/>
            Sign Up
          </button>

          {/* Error message (like login page) */}
          {error && (
            <p style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}>
              {error}
            </p>
          )}





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
