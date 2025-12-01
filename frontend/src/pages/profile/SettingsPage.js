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

const API = "http://localhost:8000";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(2);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFinalDeleteModal, setShowFinalDeleteModal] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

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

  // -----------------------------
  // CHANGE PASSWORD
  // -----------------------------
  async function handleChangePassword() {
    const token = localStorage.getItem("accessToken");
    //const email = localStorage.getItem("email"); // make sure email is stored on login
    if (!token) return alert("No token or email found!");

    try {
      const res = await fetch(`${API}/change-password`, {
        method: "PUT", // matches your backend method
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            oldPassword: oldPassword,   // camelCase as backend expects
            newPassword: newPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Password changed successfully!");
        setShowPasswordModal(false);
        setOldPassword("");
        setNewPassword("");
      } else {
        alert(data.message || "Error changing password");
      }
    } catch (err) {
      console.error("Change password error:", err);
      alert("Server error while changing password");
    }
  }


  // -----------------------------
  // DELETE ACCOUNT
  // -----------------------------
  async function handleDeleteAccount() {
    const token = localStorage.getItem("accessToken");
    if (!token) return alert("No token found!");

    try {
      const res = await fetch(`${API}/me/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          password: deletePassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Account deleted successfully!");
        localStorage.removeItem("accessToken");
        navigate("/");
      } else {
        alert(data.message || "Error deleting account");
      }
    } catch (err) {
      console.error("Delete account error:", err);
      alert("Server error while deleting account");
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
          <li><a href="#">Contact</a></li>
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
                    i === 3 ? "/question.png" :
                    "/logout.png"
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
          <p className="settings-subtitle">Manage your account settings below</p>

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

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">Change your password</h2>

            <label className="modal-label">Old password</label>
            <input
              type={showOldPassword ? "text" : "password"}
              className="modal-input"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
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
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
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
              <button
                className="btn-confirm"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
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
                  setShowFinalDeleteModal(true);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FINAL DELETE MODAL */}
      {showFinalDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title" style={{ textAlign: "center" }}>
              Delete the Account
            </h2>

            <label className="modal-label">Enter password</label>
            <input
              type={showDeletePassword ? "text" : "password"}
              className="modal-input"
              value={deletePassword}
              onChange={e => setDeletePassword(e.target.value)}
            />

            <div className="checkbox-row">
              <input
                type="checkbox"
                id="deletePwCheck"
                checked={showDeletePassword}
                onChange={() => setShowDeletePassword(!showDeletePassword)}
              />
              <label htmlFor="deletePwCheck" className="checkbox-label">
                Show password
              </label>
            </div>

            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowFinalDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-danger"
                onClick={handleDeleteAccount}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
