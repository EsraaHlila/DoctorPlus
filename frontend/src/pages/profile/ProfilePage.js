import React, { useState, useRef } from 'react';
import './ProfilePage.css';

const MENU = [
  'My Profile',
  'My Appointments',
  'settings',
  'Help Center',
  'Logout',
];

export default function ProfilePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', birthday: '', phone: '' });
  const [profileSrc, setProfileSrc] = useState('/defaultProfile.png'); 
  const fileInputRef = useRef(null);

  function handleMenuClick(i) {
    setActiveIndex(i);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function onReset() {
    setForm({ firstName: '', lastName: '', birthday: '', phone: '' });
  }

  function onSave(e) {
    e?.preventDefault();
    console.log('Saved (front-end only):', form);
    alert('Form saved (front-end only)');
  }

  function onChangeProfileClick() {
    fileInputRef.current?.click();
  }

  function onProfileSelected(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setProfileSrc(url);
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

        <main className="pp-main">
          <h1 className="pp-title">Edit profile</h1>

          <div className="pp-profile-wrap">
            <div className="pp-avatar-holder">
              <img className="pp-avatar" src={profileSrc} alt="profile" />

            </div>

            <button className="pp-change-btn" onClick={onChangeProfileClick}>Change</button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onProfileSelected}
              style={{ display: 'none' }}
            />
          </div>

          <form className="pp-form" onSubmit={onSave}>
            <label className="pp-field">
              <div className="pp-label">First name</div>
              <input name="firstName" value={form.firstName} onChange={handleChange} />
            </label>

            <label className="pp-field">
              <div className="pp-label">Last name</div>
              <input name="lastName" value={form.lastName} onChange={handleChange} />
            </label>

            <label className="pp-field">
              <div className="pp-label">Birthday</div>
              <input name="birthday" value={form.birthday} onChange={handleChange} placeholder="YYYY-MM-DD" />
            </label>

            <label className="pp-field">
              <div className="pp-label">Phone number</div>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>

            <div className="pp-actions">
              <button type="button" className="pp-reset" onClick={onReset}>Reset</button>
              <button type="submit" className="pp-save">Save</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
