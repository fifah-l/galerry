import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Mengimpor SweetAlert2
import axios from 'axios'; // Mengimpor axios
import "../Css/Tambah.css";

const Tambah = () => {
  const [newProduct, setNewProduct] = useState({ namaBoneka: '', harga: '', deskripsi: '', stok: '' });
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const { namaBoneka, harga, deskripsi, stok } = newProduct;

    if (!namaBoneka || !harga || !deskripsi || !stok) {
      Swal.fire({
        icon: 'warning',
        title: 'Harap Isi Semua Kolom!',
        text: 'Silakan isi semua kolom untuk menambahkan produk.',
        confirmButtonColor: '#9B4D96',
      });
      return;
    }

    if (harga <= 0 || stok <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Tidak Valid!',
        text: 'Harga dan stok harus bernilai positif.',
        confirmButtonColor: '#9B4D96',
      });
      return;
    }

    const idAdmin = JSON.parse(localStorage.getItem("adminData"))?.id;
    if (!idAdmin) {
      Swal.fire({
        icon: 'error',
        title: 'Admin Tidak Ditemukan!',
        text: 'Tidak ada informasi admin yang ditemukan.',
        confirmButtonColor: '#9B4D96',
      });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:9080/api/produk/tambah/${idAdmin}`, newProduct);
      
      Swal.fire({
        icon: 'success',
        title: 'Produk Ditambahkan!',
        text: `Produk ${response.data.namaBoneka} berhasil ditambahkan.`,
        confirmButtonColor: '#9B4D96',
      }).then(() => {
        navigate("/product-list");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menambahkan Produk',
        text: 'Terjadi kesalahan saat menambahkan produk.',
        confirmButtonColor: '#9B4D96',
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-product">
      <h2>Tambah Produk</h2>
      <input
        type="text"
        value={newProduct.namaBoneka}
        onChange={(e) => setNewProduct({ ...newProduct, namaBoneka: e.target.value })}
        placeholder="Nama Produk"
        required
      />
      <input
        type="number"
        value={newProduct.harga}
        onChange={(e) => setNewProduct({ ...newProduct, harga: e.target.value })}
        placeholder="Harga Produk"
        required
      />
      <textarea
        value={newProduct.deskripsi}
        onChange={(e) => setNewProduct({ ...newProduct, deskripsi: e.target.value })}
        placeholder="Deskripsi Produk"
        required
      />
      <input
        type="number"
        value={newProduct.stok}
        onChange={(e) => setNewProduct({ ...newProduct, stok: e.target.value })}
        placeholder="Stok Produk"
        required
      />
      <div className="button-group">
        <button onClick={handleAddProduct}>Tambah</button>
        <button onClick={() => navigate("/product-list")}>Batal</button>
      </div>
    </div>
  );
};

export default Tambah;
