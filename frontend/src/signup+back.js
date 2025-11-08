import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
        phone_number: "",
        address: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Erreur lors de l'inscription");
                return;
            }

            alert("Inscription réussie !");
            navigate("/"); // redirect to SignIn
        } catch (err) {
            console.error(err);
            setError("Erreur de connexion au serveur");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 text-success">DoctorPlus - Inscription</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom complet :</label>
                        <input type="text" name="name" className="form-control"
                               placeholder="Entrez votre nom" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email :</label>
                        <input type="email" name="email" className="form-control"
                               placeholder="Entrez votre email" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mot de passe :</label>
                        <input type="password" name="password" className="form-control"
                               placeholder="Créez un mot de passe" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ville :</label>
                        <input type="text" name="city" className="form-control"
                               placeholder="Votre ville" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Téléphone :</label>
                        <input type="text" name="phone_number" className="form-control"
                               placeholder="Votre numéro" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Adresse :</label>
                        <input type="text" name="address" className="form-control"
                               placeholder="Votre adresse" onChange={handleChange} required />
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}

                    <button type="submit" className="btn btn-success w-100">Créer un compte</button>
                </form>

                <p className="text-center mt-3">
                    Déjà un compte ? <Link to="/">Se connecter</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
