import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Veuillez remplir tous les champs !");
        } else {
            setError("");
            alert("Connexion réussie  (intégration backend à venir)");
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