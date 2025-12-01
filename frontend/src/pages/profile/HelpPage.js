import React, { useState } from "react";
import "./SettingsPage.css";
import { useNavigate } from "react-router-dom";

const MENU = [
  "My Profile",
  "My Appointments",
  "Settings",
  "Help Center",
  "Logout",
];

export default function SettingsPage() {
const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(3);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  function handleMenuClick(i) {

      setActiveIndex(i);

      if (i === 0) navigate("/profile");
      if (i === 1) navigate("/appointments");
      if (i === 2) navigate("/settings");
      if (i === 3) navigate("/help");
      if (i === 4) {
        localStorage.removeItem("accessToken");
        navigate("/");
      }
    }



  return (
    <div className="pp-container">

      <nav className="navbar">
        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="about-us">About Us</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <div className="pp-body">

        <aside className="pp-sidebar">
          {MENU.map((label, i) => {
            const active = i === activeIndex;
            const hover = i === hoverIndex;

            return (
              <div
                key={label}
                onClick={() => handleMenuClick(i)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`pp-menu-item ${active ? "active" : ""} ${!active && hover ? "hover" : ""}`}
              >
                <img
                  className="pp-dot-img"
                  src={
                    i === 0 ? "/user.png" :
                    i === 1 ? "/history.png" :
                    i === 2 ? "/cogwheel.png" :
                    i === 3 ? "/question.png" : "/logout.png"
                  }
                  alt=""
                />
                <span className="pp-menu-text">{label}</span>
              </div>
            );
          })}
        </aside>

        <main className="settings-main">

          <h1 className="settings-title">Help Center</h1>
          <p className="settings-subtitle">Find answers and get support instantly</p>
          <div className="settings-card">

            <div
              className="settings-row"
              onClick={() => setShowPrivacyPolicy(true)}
            >
              <div>
                <h3 className="row-title">Privacy Policy</h3>
              </div>
              <span className="arrow">›</span>
            </div>

            <div
              className="settings-row"
              onClick={() => setShowHelpPopup(true)}
            >
              <div>
                <h3 className="row-title">Help</h3>
              </div>
              <span className="arrow">›</span>
            </div>

          </div>
        </main>
      </div>

      {showPrivacyPolicy && (
        <div className="modal-overlay">
          <div className="modal-box privacy-box popup-3d">
            <h1 className="pp-title">Privacy Policy</h1>
            <p className="pp-update">Last update: 14/08/2024</p>

            <div className="modal-content">
              <section>
                <p>
                  At DoctorPlus+, we take your privacy seriously. This Privacy Policy explains how we collect,
                  use, and protect your personal information when you use our application.
                </p>
              </section>

              <section>
                <h2>Terms & Conditions</h2>
                <p>1- We use your data to provide and improve our services.</p>
                <p>2- We may share your information only with trusted providers.</p>
                <p>3- You have the right to access or delete your information.</p>
              </section>
            </div>

            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowPrivacyPolicy(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

{showHelpPopup && (
  <div className="modal-overlay">
    <div className="modal-box privacy-box popup-3d">
      <h2 className="pp-title">Report a Problem</h2>

      <textarea
        className="help-textarea"
        placeholder="Please provide as much information as possible…"
      ></textarea>

      <input
        type="file"
        className="help-upload"
        onChange={(e) => console.log(e.target.files)}
      />

      <p className="help-footer">
Your profile name and browser information will be automatically included in the report.</p>

      <div className="modal-buttons">
        <button
          className="btn-cancel"
          onClick={() => setShowHelpPopup(false)}
        >
          Cancel
        </button>
        <button className="btn-confirm">
          Send Report
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
