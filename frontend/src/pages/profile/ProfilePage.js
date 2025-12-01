import React, { useState, useRef, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

const MENU = [
  'My Profile',
  'My Appointments',
  'Settings',
  'Help Center',
  'Logout',
];

export default function ProfilePage() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [form, setForm] = useState({
    name: '',
    birthday: '',
    phone: '',
    address: '',
    city: '',
    email: ''
  });

  const [profileSrc, setProfileSrc] = useState('/defaultProfile.png');
  const fileInputRef = useRef(null);

  // -----------------------------
  // LOAD PROFILE (/me)
  // -----------------------------
useEffect(() => {
  async function loadProfile() {
    const token = localStorage.getItem("accessToken");
    console.log("Token from localStorage:", token);
    if (!token) return;

    try {
      const res = await fetch(`${API}/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      console.log("/me response status:", res.status);
      const data = await res.json();
      console.log("/me response data:", data);

      if (!data.user) return;

      const u = data.user;
      setForm({
        name: u.name || "",
        birthday: u.birth_date || "",
        phone: u.phone_number || "", // <-- fix mapping
        address: u.address || "",
        city: u.city || "",
        email: u.email || ""
      });

      if (u.profile_picture) {
        setProfileSrc(u.profile_picture.startsWith('http') ? u.profile_picture : `${API}${u.profile_picture}`);
      }

    } catch (err) {
      console.error("Error loading profile:", err);
    }
  }

  loadProfile();
}, []);


  // -----------------------------
  // MENU NAVIGATION
  // -----------------------------
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
  // FORM HANDLING
  // -----------------------------
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function onReset() {
    setForm({
      name: '',
      birthday: '',
      phone: '',
      address: '',
      city: '',
      email: ''
    });
  }

 async function onSave(e) {
   e.preventDefault();
   const token = localStorage.getItem("accessToken");
   if (!token) return alert("No token found!");

   const formData = new FormData();
   formData.append("name", form.name);
   formData.append("email", form.email);
   formData.append("phone_number", form.phone);
   formData.append("address", form.address);
   formData.append("city", form.city);

   if (fileInputRef.current?.files[0]) {
     formData.append("profile_picture", fileInputRef.current.files[0]);
   }

   try {
     const res = await fetch(`${API}/me/update`, {
       method: "PUT",
       headers: {
         "Authorization": `Bearer ${token}`
       },
       body: formData
     });

     const data = await res.json();
     if (res.ok) {
       alert("Profile updated successfully!");
       if (data.user.profile_picture) {
         setProfileSrc(data.user.profile_picture.startsWith('http') ? data.user.profile_picture : `${API}${data.user.profile_picture}`);
       }
     } else {
       alert(data.message || "Error updating profile");
     }
   } catch (err) {
     console.error("Error updating profile:", err);
     alert("Server error while updating profile");
   }
 }

 // Handle profile picture change instantly in preview



  // -----------------------------
  // PROFILE PICTURE
  // -----------------------------
  function onChangeProfileClick() {
    fileInputRef.current?.click();
  }


  async function onProfileSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API}/change-profile-picture`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}` // Do NOT set Content-Type here
        },
        body: formData
      });

      console.log("/change-profile-picture response status:", res.status);
      const data = await res.json();
      console.log("/change-profile-picture response data:", data);

      if (data.imageUrl) {
        setProfileSrc(data.imageUrl); // full URL from backend
      }

    } catch (err) {
      console.error("Profile upload error:", err);
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
          <h1 className="pp-title">Edit Profile</h1>

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
              <div className="pp-label">Name</div>
              <input name="name" value={form.name} onChange={handleChange} />
            </label>

            <label className="pp-field">
              <div className="pp-label">Birthday</div>
              <input name="birthday" value={form.birthday} onChange={handleChange} placeholder="YYYY-MM-DD" />
            </label>

            <label className="pp-field">
              <div className="pp-label">Phone</div>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>

            <label className="pp-field">
              <div className="pp-label">Address</div>
              <input name="address" value={form.address} onChange={handleChange} />
            </label>

            <label className="pp-field">
              <div className="pp-label">City</div>
              <input name="city" value={form.city} onChange={handleChange} />
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
