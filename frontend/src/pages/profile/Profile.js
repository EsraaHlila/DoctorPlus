import React, { useState, useEffect } from 'react';
import './profile.css';

const profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    address: '',
    password: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Placeholder useEffect (to connect later with backend)
  useEffect(() => {
    // TODO: fetch user data from backend here
    // Example:
    // fetchUserProfile();
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send updated user data to backend
    console.log('User data to update:', user);
    setMessage('Profil mis à jour (simulation, à connecter au backend)');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: reload original data from backend
    setIsEditing(false);
    setMessage('');
  };

  if (loading) {
    return <div className="loading">Chargement du profil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mon Profil</h1>
        <p>Gérez vos informations personnelles</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Erreur') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="profile-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              name="city"
              value={user.city}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <textarea
              id="address"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Mot de passe {!isEditing && <span className="password-note">(caché pour des raisons de sécurité)</span>}
            </label>
            {isEditing ? (
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Entrez votre nouveau mot de passe"
              />
            ) : (
              <input
                type="password"
                value="••••••••"
                disabled
                className="password-hidden"
              />
            )}
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button 
                type="button" 
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                Modifier le profil
              </button>
            ) : (
              <div className="edit-actions">
                <button type="submit" className="btn-save">
                  Enregistrer
                </button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="profile-info">
        <h3>Informations du compte</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Date de création:</span>
            <span className="info-value">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Statut:</span>
            <span className="info-value status-active">Actif</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
