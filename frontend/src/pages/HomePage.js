import React from "react";
import "./HomePage.css";
import doctorBg from "../doctor-bg.jpg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <section
        className="hero"
        style={{ backgroundImage: `url(${doctorBg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Book Your Doctor 
              Appointment Online</h1>
            <p>
              A Healthier Tomorrow Starts Today — Schedule Your Appointment!
            </p>
            <div className="buttons">
              <button className="btn primary">Book an Appointment</button>
              <button className="btn secondary">Call Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="schedule-section">
        <div className="schedule-cards">
          <div className="schedule-card">
            <h3>Working Hours</h3>
            <ul>
              <li>Monday – Friday: 08:00 – 18:00</li>
              <li>Saturday: 09:00 – 14:00</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div className="schedule-card">
            <h3>Appointments History</h3>
            <ul>
              <li>✔️ 12 Sept 2025 – Completed</li>
              <li>✔️ 20 Oct 2025 – Completed</li>
              <li>🕓 10 Nov 2025 – Upcoming</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
