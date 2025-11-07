import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Veuillez remplir tous les champs !");
        } else {
            setError("");
            alert("Compte créé avec succès ✅ (intégration backend à venir)");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">🩺 DoctorPlus</h2>
                <p className="auth-subtitle">Créer un nouveau compte</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom complet"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
