import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AppointmentsPage.css";
import { useNavigate } from "react-router-dom";

const MENU = [
  "My Profile",
  "My Appointments",
  "Settings",
  "Help Center",
  "Logout",
];

export default function AppointmentsPage() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(1);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showNextPopup, setShowNextPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const morningTimes = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30"];
  const eveningTimes = ["14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

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

  // Book appointment function
  async function confirmAppointment() {
    const token = localStorage.getItem("accessToken");
    if (!token) return alert("No token found!");
    if (!selectedTime || !selectedDate) return alert("Please select a date and time");

    try {
      const res = await fetch("http://localhost:8000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Appointment confirmed on ${selectedDate.toDateString()} at ${selectedTime}`);
        setShowNextPopup(false);
        setSelectedTime(null);
      } else {
        alert(data.message || "Error booking appointment");
      }
    } catch (err) {
      console.error("Appointment booking error:", err);
      alert("Server error while booking appointment");
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
          <li><a href="/about-us">About Us</a></li>
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
          <h1 className="settings-title">My appointments</h1>
          <p className="settings-subtitle">Review upcoming and past appointments</p>

          <div className="settings-card">
            <div className="settings-row" onClick={() => navigate("/pre")}>
              <div><h3 className="row-title">Previous Appointments</h3></div>
              <span className="arrow">›</span>
            </div>

            <div className="settings-row" onClick={() => setShowNextPopup(true)}>
              <div><h3 className="row-title">Book Appointment</h3></div>
              <span className="arrow">›</span>
            </div>

            <div className="settings-row" onClick={() => navigate("/up")}>
              <div><h3 className="row-title">Upcoming Appointments</h3></div>
              <span className="arrow">›</span>
            </div>
          </div>
        </main>
      </div>

      {/* ---------- NEXT APPOINTMENT POPUP ---------- */}
      {showNextPopup && (
        <div className="na-overlay">
          <div className="na-popup popup-3d">
            <h2 className="na-title">Select Date & Time</h2>
            <div className="na-container">
              <div className="calendar-wrapper">
                <Calendar onChange={setSelectedDate} value={selectedDate} />
              </div>

              <div className="na-times">
                <h3>MORNING</h3>
                <div className="time-grid">
                  {morningTimes.map(t => (
                    <div
                      key={t}
                      className={`time-box ${selectedTime === t ? "selected-time" : ""}`}
                      onClick={() => setSelectedTime(t)}
                    >{t}</div>
                  ))}
                </div>

                <h3>EVENING</h3>
                <div className="time-grid">
                  {eveningTimes.map(t => (
                    <div
                      key={t}
                      className={`time-box ${selectedTime === t ? "selected-time" : ""}`}
                      onClick={() => setSelectedTime(t)}
                    >{t}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="na-buttons">
              <button className="btn-cancel" onClick={() => setShowNextPopup(false)}>Cancel</button>
              <button className="btn-confirm" onClick={confirmAppointment}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
