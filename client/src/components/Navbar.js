import React from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <h1>Üretim Kayıt Sistemi</h1>
      <div className="navbar-nav">
        {user && (
          <>
            <span>Hoş geldin, {user.fullName || user.username}</span>
            <button onClick={logout} className="btn btn-secondary">
              Çıkış
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
