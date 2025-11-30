import React, { useState } from "react";
import "./AppointmentsPage.css";

const MENU = [
  "My Profile",
  "My Appointments",
  "Settings",
  "Help Center",
  "Logout",
];

export default function SettingsPage() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  return (
    <div className="pp-container">

      <nav className="navbar">
        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About Us</a></li>
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
                onClick={() => setActiveIndex(i)}
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

          <h1 className="settings-title">My appointments</h1>
          <p className="settings-subtitle">Review upcoming and past appointments</p>
          <div className="settings-card">

            <div
              className="settings-row"
              onClick={() => setShowPrivacyPolicy(true)}
            >
              <div>
                <h3 className="row-title">Previews</h3>
              </div>
              <span className="arrow">›</span>
            </div>

            <div
              className="settings-row"
              onClick={() => setShowHelpPopup(true)}
            >
              <div>
                <h3 className="row-title">Active</h3>
              </div>
              <span className="arrow">›</span>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

