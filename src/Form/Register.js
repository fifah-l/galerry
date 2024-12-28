import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import '../Css/Register.css'; // Mengimpor file CSS untuk styling

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // Use useState for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fungsi untuk toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fungsi untuk mengirimkan form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi inputan
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Semua field harus diisi.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      Swal.fire({
        icon: "error",
        title: "Password harus memiliki minimal 8 karakter, satu huruf besar, dan satu huruf kecil.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // Mengirim data ke server dengan Axios
      const response = await axios.post("http://localhost:8080/api/user/register", {
        username,
        email,
        password,
      });

      // Menangani respons dari server
      Swal.fire({
        icon: "success",
        title: "Registrasi berhasil!",
        text: `Akun untuk ${response.data.username} berhasil dibuat.`,
        showConfirmButton: true,
      });

      // Redirect setelah sukses
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan saat registrasi.",
          text: "Coba lagi nanti.",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Input Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input 
                type="text" 
                value={username} // Correctly bind the username state
                onChange={(e) => setUsername(e.target.value)} // Use setUsername to update the value
              />
            </div>
          </div>

          {/* Input Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faKey} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-field"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="password-toggle-btn" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="login-link">
            Sudah punya akun? <a href="/" className="login-link-text">Masuk</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
