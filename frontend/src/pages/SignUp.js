import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 text-success">DoctorPlus - Inscription</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nom complet :</label>
                        <input type="text" className="form-control" placeholder="Entrez votre nom" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email :</label>
                        <input type="email" className="form-control" placeholder="Entrez votre email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe :</label>
                        <input type="password" className="form-control" placeholder="Créez un mot de passe" />
                    </div>
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
