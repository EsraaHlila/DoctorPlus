import React from "react";
import { useNavigate } from "react-router-dom";
import "./error_signin.css";

function ErrorSignin() {
  const navigate = useNavigate();

  return (
    <div className="error-signin-container">
      <div className="error-signin-card">
        <h1>Veuillez vous connecter</h1>
        <p>Vous devez être connecté pour accéder à votre profil.</p>
        <button onClick={() => navigate("/")} className="signin-btn">
          Aller à la page de connexion
        </button>
      </div>
    </div>
  );
}

export default ErrorSignin;
