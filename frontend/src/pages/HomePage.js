import React from "react";
import "./HomePage.css";
import doctorBg from "../assets/doctor-bg.jpg";

function HomePage() {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${doctorBg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Book Your Doctor Appointment Online</h1>
            <p>
              A Healthier Tomorrow Starts Today — Schedule Your Appointment!
              <br />
              Your Wellness, Our Expertise: Set Up Your Appointment Today.
            </p>
            <div className="buttons">
              <button className="btn primary">Book an Appointment</button>
              <button className="btn secondary">Call Now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
