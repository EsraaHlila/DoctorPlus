import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Email ou mot de passe incorrect");
                return;
            }

            // Save tokens in localStorage
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Connexion réussie !");
            navigate("/dashboard"); // redirect to home/dashboard page

        } catch (err) {
            console.error(err);
            setError("Erreur de connexion au serveur");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 text-primary">DoctorPlus - Connexion</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email :</label>
                        <input type="email" className="form-control"
                               placeholder="Entrez votre email"
                               value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe :</label>
                        <input type="password" className="form-control"
                               placeholder="Entrez votre mot de passe"
                               value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}

                    <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                </form>
                <p className="text-center mt-3">
                    Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
