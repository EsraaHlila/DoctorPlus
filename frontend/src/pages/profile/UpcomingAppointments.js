import React, { useEffect, useState } from "react";
import "./PreviousAppointments.css";

const UpcomingAppointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8000/appointments/upcoming", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUpcomingAppointments(data))
      .catch(err => console.error(err));
  }, []);

  // Function to handle review button click
  const handleReviewClick = (appointmentId) => {
    // You can replace this with a popup/modal for review input
    const review = prompt("Enter your review for this appointment:");
    if (!review) return;

    const token = localStorage.getItem("accessToken");
    fetch(`http://localhost:8000/appointments/${appointmentId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ review })
    })
    .then(res => res.json())
    .then(data => alert(data.message || "Review submitted successfully"))
    .catch(err => console.error(err));
  }

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo"><span className="brand">Doctor</span><span className="plus">Plus+</span></div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <button className="back-arrow" onClick={() => window.history.back()}>←</button>

      <div className="previous-appointments-container">
        <h2 className="previous-title">Upcoming Appointments</h2>

        {upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          upcomingAppointments.map(item => (
            <div key={item.id} className="upcoming-card">
              <div className="appointment-left">
                <span className="date-label"><strong>Date :</strong> {new Date(item.date).toLocaleDateString()}</span>
                <span className="time-label"><strong>Time :</strong> {item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* Fix for Upcoming Appointments ONLY */


export default UpcomingAppointments;
