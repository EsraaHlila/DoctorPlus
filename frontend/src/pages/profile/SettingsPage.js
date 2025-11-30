import React, { useState } from "react";
import "./SettingsPage.css";

const MENU = [
  "My Profile",
  "Activity History",
  "Settings",
  "Help Center",
  "Logout",
];

export default function SettingsPage() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
                className={`pp-menu-item ${active ? "active" : ""} ${
                  !active && hover ? "hover" : ""
                }`}
              >
                <img
                  className="pp-dot-img"
                  src={
                    i === 0
                      ? "/user.png"
                      : i === 1
                      ? "/history.png"
                      : i === 2
                      ? "/cogwheel.png"
                      : i === 3
                      ? "/question.png"
                      : "/logout.png"
                  }
                  alt=""
                />
                <span className="pp-menu-text">{label}</span>
              </div>
            );
          })}
        </aside>

        <main className="settings-main">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account settings below.</p>

          <div className="settings-card">

            <div className="settings-row" onClick={() => setShowPasswordModal(true)}>
              <div>
                <h3 className="row-title">Change Password</h3>
                <p className="row-value">Update your login password</p>
              </div>
              <span className="arrow">›</span>
            </div>

            <div className="settings-row" onClick={() => setShowDeleteModal(true)}>
              <div>
                <h3 className="row-title">Delete Account</h3>
                <p className="row-value row-danger">This action is permanent</p>
              </div>
              <span className="arrow">›</span>
            </div>

          </div>
        </main>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">Change your password</h2>

            <label className="modal-label">Old password</label>
            <input
              type={showOldPassword ? "text" : "password"}
              className="modal-input"
            />
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="showOld"
                checked={showOldPassword}
                onChange={() => setShowOldPassword(!showOldPassword)}
              />
              <label htmlFor="showOld" className="checkbox-label">
                Show old password
              </label>
            </div>

            <label className="modal-label">New password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              className="modal-input"
            />
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="showNew"
                checked={showNewPassword}
                onChange={() => setShowNewPassword(!showNewPassword)}
              />
              <label htmlFor="showNew" className="checkbox-label">
                Show new password
              </label>
            </div>

            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button className="btn-confirm">Change Password</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
          <h2 className="modal-title">Tell us why you're leaving</h2>


            <div className="da-radio-group">
  <label>
    <input type="radio" name="reason" />
    I’m getting too many emails
  </label>
  <label>
    <input type="radio" name="reason" />
    I accidentally made another account
  </label>
  <label>
    <input type="radio" name="reason" />
    I'm concerned about privacy
  </label>
  <label>
    <input type="radio" name="reason" />
    Other
  </label>
</div>


            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-confirm"
                onClick={() => {
                  setShowDeleteModal(false);
                  alert("Account deletion request sent!");
                }}
              >
                Send email
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
