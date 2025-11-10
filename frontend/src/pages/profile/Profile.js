import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/error_signin");
          return;
        }

        const response = await fetch("http://localhost:8000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          navigate("/error_signin");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur lors du chargement du profil");
        }

        setUser({
          name: data.user.name || "",
          email: data.user.email || "",
          phone_number: data.user.phone || "",
          city: data.user.city || "",
          address: data.user.address || "",
        });
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/me/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la mise à jour");
      }

      setMessage("Profil mis à jour avec succès !");
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue. Réessayez plus tard.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/me/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de la suppression du compte.");
        return;
      }

      alert("Compte supprimé avec succès !");
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue. Réessayez plus tard.");
    }
  };

  if (loading) {
    return <div className="profile-container">Chargement du profil...</div>;
  }

  return (
    <div className="profile-page">
      {/* HEADER */}
      <header className="doctorplus-header">
        <div className="logo">DoctorPlus+</div>
        <nav>
          <a href="/home">Home</a>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#" className="active">
            Profile
          </a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* BACKGROUND + FORM */}
      <div className="profile-hero">
        <div className="overlay"></div>
        <div className="profile-form-container">
          <h1>Mon Profil</h1>
          <p>Gérez vos informations personnelles</p>

          {error && <div className="message error">{error}</div>}
          {message && <div className="message success">{message}</div>}

          <form onSubmit={handleSave} className="profile-form">
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={user.name}
                onChange={handleChange}
                disabled={!editing}
              />
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={user.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                name="phone_number"
                placeholder="Numéro de téléphone"
                value={user.phone_number}
                onChange={handleChange}
                disabled={!editing}
              />
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={user.city}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                name="address"
                placeholder="Adresse"
                value={user.address}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="profile-actions">
              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="btn-primary"
                >
                  Modifier le profil
                </button>
              ) : (
                <div className="edit-actions">
                  <button type="submit" className="btn-primary">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </form>

          <div className="auth-buttons">
            <button onClick={handleLogout} className="btn-logout">
              Se déconnecter
            </button>
            <button onClick={handleDeleteAccount} className="btn-delete">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
