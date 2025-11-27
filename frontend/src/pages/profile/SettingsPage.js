import React, { useState } from "react";
import './SettingsPage.css';

const MENU = [
  'My Profile',
  'Activity History',
  'Privacy Policy',
  'Settings',
  'Help',
  'Logout',
];

export default function SettingsPage() {
  const [activeIndex, setActiveIndex] = useState(3); // Settings active
  const [hoverIndex, setHoverIndex] = useState(null);

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  function handleMenuClick(i) {
    setActiveIndex(i);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function onSave(e) {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }
    alert("Password changed successfully (front-end only)");
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  }

  function onDeleteAccount() {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted (front-end only)");
    }
  }

  return (
    <div className="pp-container">
      {/* Top Navigation */}
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

      <div className="pp-body">
        {/* Sidebar */}
        <aside className="pp-sidebar">
          {MENU.map((label, i) => {
            const active = i === activeIndex;
            const hovering = i === hoverIndex;
            return (
              <div
                key={label}
                className={`pp-menu-item ${active ? 'active' : ''} ${hovering && !active ? 'hover' : ''}`}
                onClick={() => handleMenuClick(i)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <img
                  className="pp-dot-img"
                  src={
                    i === 0 ? "/user.png" :
                    i === 1 ? "/history.png" :
                    i === 2 ? "/shield.png" :
                    i === 3 ? "/cogwheel.png" :
                    i === 4 ? "/question.png" :
                    "/logout.png"
                  }
                  alt=""
                />
                <span className="pp-menu-text">{label}</span>
              </div>
            );
          })}
        </aside>

        {/* Main Settings Content */}
        <main className="settings-content">
          {/* Change Password */}
          <section className="settings-section">
            <form className="settings-form" onSubmit={onSave}>
              <h2>Change Password</h2>

              <label className="settings-field">
                Current Password
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="settings-field">
                New Password
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="settings-field">
                Confirm New Password
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="settings-options">
                <label className="show-password">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show Password
                </label>
                <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="settings-save-btn">Save Password</button>
            </form>
          </section>

          {/* Delete Account */}
          <section className="settings-section">
            <p className="delete-instruction">
              Deleting your account is permanent. All your data will be lost and cannot be recovered.
            </p>
            <button className="settings-delete-btn" onClick={onDeleteAccount}>Delete Account</button>
          </section>
        </main>
      </div>
    </div>
  );
}
