import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css'; // Pastikan Anda membuat file CSS ini
import 'font-awesome/css/font-awesome.min.css'; // Mengimpor FontAwesome
import axios from 'axios';
import { API_LOGIN } from '../utils/BaseUrl';

const Login = () => {
  const [email, setEmail] = useState('');  // Ganti 'username' dengan 'email'
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {  // Ganti 'username' dengan 'email'
      setError('Silakan isi email dan password.');
      return;
    }
    setError('');

    try {
      // Mengirim data ke server dengan Axios
      const response = await axios.post(`${API_LOGIN}`)( {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, adminData } = data; // Misalnya, data yang diterima berisi token dan adminData

        // Simpan token dan data admin yang diterima dari server
        localStorage.setItem("authToken", token);
        localStorage.setItem("adminData", JSON.stringify(adminData)); // Store admin data as stringified JSON
        localStorage.setItem("adminId", adminData.id);

        // Redirect ke halaman produk
        navigate('/product-list');
      } else {
        const errorData = await response.text();
        setError(errorData || 'Login gagal');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-background-card"></div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <label>Email</label> {/* Ganti 'Username' dengan 'Email' */}
          <input
            type="email"  // Pastikan tipe input adalah 'email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Ganti 'username' dengan 'email'
            required
            placeholder="Masukkan email"
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
