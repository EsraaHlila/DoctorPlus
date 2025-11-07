import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // for redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs !");
      return;
    }

    try {
      setError("");
      setSuccess("");

      // 🧩 Send request to backend
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur de connexion.");
        return;
      }

      // ✅ Login successful
      setSuccess("Connexion réussie ✅");

      // Save token to localStorage (for future authenticated requests)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard or home page (you can change the route)
      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError("Une erreur est survenue. Réessayez plus tard.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">👨‍⚕️ DoctorPlus</h2>
        <p className="auth-subtitle">Connectez-vous à votre espace</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <button type="submit">Se connecter</button>
        </form>
        <p className="switch-text">
          Pas encore inscrit ? <Link to="/signup">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
