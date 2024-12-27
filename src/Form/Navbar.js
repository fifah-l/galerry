import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for redirection
import '../Css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Menghapus token dari localStorage
    localStorage.removeItem("adminData"); // Optional: Remove admin data
    navigate('/login'); // Arahkan pengguna ke halaman login setelah logout
  };

  // Check if the user is logged in by checking the presence of the authToken in localStorage
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
              <button 
                className="logout-button" 
                onClick={handleLogout} 
                aria-label="Logout"
              >
                Logout
              </button>
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
