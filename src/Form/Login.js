import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate dari react-router-dom
import '../Css/Login.css'; // Pastikan Anda membuat file CSS ini
import 'font-awesome/css/font-awesome.min.css'; // Mengimpor FontAwesome

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Silakan isi username dan password.');
      return;
    }
    setError('');
    onLogin(); // Mengubah status login
    navigate('/product-list'); // Setelah login, arahkan ke halaman product-list
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      {/* Card behind the login form */}
      <div className="login-background-card"></div>

      {/* Form Login */}
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Masukkan username"
          />
          <label>Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
            />
            <i
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={togglePasswordVisibility}
              id="show-password-icon"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
