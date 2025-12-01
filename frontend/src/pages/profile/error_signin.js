import React from "react";
import { useNavigate } from "react-router-dom";
import "./error_signin.css";

function ErrorSignin() {
  const navigate = useNavigate();

  return (
    <div className="error-signin-container">
      <div className="error-signin-card">
        <h1>Please Sign In</h1>
        <p>You should be signed in in order to view this page.</p>
        <button onClick={() => navigate("/")} className="signin-btn">
          Go To Sign In Page
        </button>
      </div>
    </div>
  );
}

export default ErrorSignin;
