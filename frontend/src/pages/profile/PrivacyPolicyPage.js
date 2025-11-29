import React, { useState } from 'react';
import './PrivacyPolicyPage.css';

const MENU = [
  'My Profile',
  'Activity History',
  'Settings',
  'Help',
  'Logout',
];

export default function PrivacyPolicyPage() {
  const [activeIndex, setActiveIndex] = useState(2); 
  const [hoverIndex, setHoverIndex] = useState(null);

  function handleMenuClick(i) {
    setActiveIndex(i);
  }

  return (
    <div className="pp-container">
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

        <main className="pp-main privacy-policy">
          <h1 className="pp-title">Privacy Policy</h1>
          <p className="pp-update">Last update: 14/08/2024</p>

          <section>
            <p>
              At DoctorPlus+, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our application.
            </p>
          </section>

          <section>
            <h2>Terms & Conditions</h2>
            <p>
              1- We may collect personal information such as your name, email address, phone number, and other details you provide when signing up or using our services. We also collect non-personal information, including usage data, device information, and analytics to improve the app experience.
            </p>
            <p>
              2- We use your data to provide and improve our services, communicate important updates, personalize your experience, and ensure security. Your information will never be sold to third parties.
            </p>
            <p>
              3- We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of electronic storage or transmission is completely secure.
            </p>
            <p>
              4- We may share your information only with trusted service providers who help us operate the app, comply with legal obligations, or in the case of business transfers. We do not sell or rent your personal data.
            </p>
            <p>
              5- You have the right to access, update, or request deletion of your personal information. You may also opt out of marketing communications at any time.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
