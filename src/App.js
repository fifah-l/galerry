import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Form/Navbar';
import ProdukList from './Form/ProdukList';
import Galerry from './Form/Galerry';
import Login from './Form/Login';
import Tambah from './Form/Tambah'; 
import EditProduk from './Form/EditProduk';
import PrivateRoute from './private/PrivateRoute'; // Import PrivateRoute
import Register from './Form/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Galerry />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protecting routes with PrivateRoute */}
            <Route path="/product-list" element={<PrivateRoute element={<ProdukList />} />} />
            <Route path="/tambah-produk" element={<PrivateRoute element={<Tambah />} />} />
            <Route path="/edit-produk/:id" element={<PrivateRoute element={<EditProduk />} />} />
            <Route path="/register" element={<Register element={<Register />} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
