import React from 'react';
import ReactDOM from 'react-dom/client'; // Gunakan 'react-dom/client' di React 18
// import './styles.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Buat root dengan createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
