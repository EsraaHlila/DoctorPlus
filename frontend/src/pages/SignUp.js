
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !city || !phone_number || !address) {
      setError("Veuillez remplir tous les champs !");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          city,
          phone_number,
          address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Une erreur est survenue.");
      } else {
        setSuccess("Compte créé avec succès ✅");
        setName("");
        setEmail("");
        setPassword("");
        setCity("");
        setPhoneNumber("");
        setAddress("");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">🩺 DoctorPlus</h2>
        <p className="auth-subtitle">Créer un nouveau compte</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="Numéro de téléphone" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
          <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <button type="submit">S'inscrire</button>
        </form>

        <p className="switch-text">
          Déjà inscrit ? <Link to="/">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
