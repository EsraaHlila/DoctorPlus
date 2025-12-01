import React, { useState } from "react";
import "./ContactUs.css";

import locationImg from "../location.png";
import appointmentImg from "../book.png";
import callImg from "../phone-call.png";
import mailImg from "../gmail.png";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


  const openEmail = () => {
    window.location.href = "mailto:doctorplus@gmail.com";
  };

  const openMaps = () => {
    window.open("https://www.google.com/maps", "_blank");
  };

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="contact-page">

      <nav className="navbar">
        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <p className="contact-subtitle">
        Call, email, or visit us and schedule your consultation today
      </p>

      <div className="contact-grid">

        <div className="contact-box" onClick={openMaps}>
          <div className="icon-box">
            <img src={locationImg} alt="Location" />
          </div>
          <h3 className="box-title">Location</h3>
          <p className="box-desc">Find our clinic on the map</p>
        </div>

        <div
          className="contact-box"
          onClick={() => navigate("/appointments")}
          //onClick={() => alert("Redirect to booking page")}
        >
          <div className="icon-box">
            <img src={appointmentImg} alt="Appointment" />
          </div>
          <h3 className="box-title" >Book Appointment</h3>
          <p className="box-desc">Schedule your medical visit</p>
        </div>

        <div
          className="contact-box"
          onClick={() => setShowPopup(true)}
        >
          <div className="icon-box">
            <img src={callImg} alt="Call Us" />
          </div>
          <h3 className="box-title">Call Us</h3>
          <p className="box-desc">We’ll answer as soon as we can</p>
        </div>

        <div className="contact-box single-box" onClick={openEmail}>
          <div className="icon-box">
            <img src={mailImg} alt="Mail Us" />
          </div>
          <h3 className="box-title">Mail Us</h3>
          <p className="box-desc">Send us your message directly</p>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Call Us</h2>

            <button className="phone-btn" onClick={() => callNumber("+21673210490")}>
              +216 73210490
            </button>

            <button className="phone-btn" onClick={() => callNumber("+21620100907")}>
              +216 20100907
            </button>

            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;