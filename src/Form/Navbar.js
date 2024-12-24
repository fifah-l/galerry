import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Gunakan useNavigate untuk redirect
import '../Css/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    onLogout();  // Panggil fungsi onLogout dari props untuk logout
    navigate('/login'); // Arahkan pengguna ke halaman login setelah logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">My Store</Link>
        <ul className="navbar-links">
          <li><Link to="/">Beranda</Link></li>
          {isLoggedIn && <li><Link to="/product-list">Daftar Produk</Link></li>}
          {isLoggedIn ? (
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
