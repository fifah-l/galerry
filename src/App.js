import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Navbar from './Form/Navbar';
import ProdukList from './Form/ProdukList';
import Galerry from './Form/Galerry';
import Login from './Form/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fungsi login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Fungsi logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Galerry />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {/* Halaman product-list hanya bisa diakses jika user sudah login */}
            <Route 
              path="/product-list" 
              element={isLoggedIn ? <ProdukList /> : <Login onLogin={handleLogin} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
