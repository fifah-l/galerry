import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminData");
    navigate('/login');
  };


  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" aria-label="Homepage">My Store</Link>
        <ul className="navbar-links">
          {!isLoggedIn && (
            <li><Link to="/" aria-label="Go to homepage">Beranda</Link></li>
          )}
          {isLoggedIn && (
            <li><Link to="/product-list" aria-label="View product list">Daftar Produk</Link></li>
          )}
          {isLoggedIn ? (
            <li>
              <button className="logout-button" onClick={handleLogout} aria-label="Logout">Logout</button>
            </li>
          ) : (
            <li><Link to="/login" aria-label="Go to login page">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
