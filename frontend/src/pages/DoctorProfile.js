
import React from 'react';
import './DoctorProfile.css';
import doctorBg from "../doctor.jpg";

export default function DoctorProfile() {

  return (
    <div className="homepage">

      <nav className="navbar">
        <div className="logo">
          <span className="brand">Doctor</span>
          <span className="plus">Plus+</span>
        </div>

        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <div className="profile-container">

        <div className="left-section remove-top-space">
          <h3 className="section-title">PROFILE</h3>
          <h1 className="doctor-name">Dr HAMDI Riadh</h1>

          <p className="degree">
            MBBS <br />
            Ibn El Jazzar Medical Faculty of Sousse
          </p>

          <h3 className="section-title">SPECIALITY</h3>
          <p className="specialties">
            Ophthalmologist<br />
            Eye Diseases and Surgery
            </p>

          <h3 className="section-title">EXPERIENCE</h3>
          <p className="experience">
            20 Years + <br />
            Former Hospital-University Assistant in Ophthalmology <br />
            Former Attaché of the Hospitals of Paris <br />
          </p>

          <h3 className="section-title">CONTACT</h3>
          <p className="contact">
            +216 73 210 490 <br />
            +216 20 100 907
          </p>

          <h3 className="section-title">ADDRESS</h3>
          <p className="address">
            City: Tunisia <br />
            State: Sousse <br />
            Street: Avenue Ibn El Jazzar
          </p>
        </div>

        <div className="right-section">
          <img
            src={doctorBg}
            alt="Doctor"
            className="photo-placeholder"
          />

          <h2 className="photo-name">Dr HAMDI Riadh</h2>

          <button className="reviews-btn">Patiens Reviews</button>

        </div>

      </div>
    </div>
  );
}
