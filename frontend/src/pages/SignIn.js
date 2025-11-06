import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 text-primary">DoctorPlus - Connexion</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Email :</label>
                        <input type="email" className="form-control" placeholder="Entrez votre email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe :</label>
                        <input type="password" className="form-control" placeholder="Entrez votre mot de passe" />
                    </div>
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
