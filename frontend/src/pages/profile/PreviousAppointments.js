import React, { useEffect, useState } from "react";
import "./PreviousAppointments.css";

const PreviousAppointments = () => {
  const [previousAppointments, setPreviousAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8000/appointments/previous", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPreviousAppointments(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo"><span className="brand">Doctor</span><span className="plus">Plus+</span></div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="about-us">About Us</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <button className="back-arrow" onClick={() => window.history.back()}>←</button>

      <div className="previous-appointments-container">
        <h2 className="previous-title">Previous Appointments</h2>

        {previousAppointments.length === 0 ? (
          <p>No previous appointments.</p>
        ) : (
          previousAppointments.map(item => (
            <div key={item.id} className="appointment-card">
              <div className="appointment-left">
                <span className="date-label"><strong>Date :</strong> {new Date(item.date).toLocaleDateString()}</span>
                <span className="time-label"><strong>Time :</strong> {item.time}</span>
              </div>
              <div className="appointment-right">
                <button className="review-btn">Add A Review</button>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="star">★</span>
                    ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PreviousAppointments;
