import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Mengimpor SweetAlert2
import "../Css/Tambah.css";

const Tambah = () => {
  const [newProduct, setNewProduct] = useState({ namaBoneka: '', harga: '', image: '', deskripsi: '', stok: '' });
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (newProduct.namaBoneka && newProduct.harga && newProduct.deskripsi && newProduct.stok) {
      // Fetch the admin ID from localStorage (assuming it's stored)
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

      // Send POST request to backend
      try {
        const response = await fetch(`http://localhost:9080/api/produk/tambah/${idAdmin}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          const savedProduct = await response.json();
          
          // Show success alert
          Swal.fire({
            icon: 'success',
            title: 'Produk Ditambahkan!',
            text: `Produk ${savedProduct.name} berhasil ditambahkan.`,
            confirmButtonColor: '#9B4D96',
          }).then(() => {
            navigate("/product-list"); // Navigate after successful submission
          });
        } else {
          // Show error alert if the response is not OK
          Swal.fire({
            icon: 'error',
            title: 'Gagal Menambahkan Produk',
            text: 'Terjadi kesalahan saat menambahkan produk.',
            confirmButtonColor: '#9B4D96',
          });
        }
      } catch (error) {
        // Handle network or other errors
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan Jaringan',
          text: 'Gagal terhubung ke server.',
          confirmButtonColor: '#9B4D96',
        });
      }
    } else {
      // Show warning alert if some fields are empty
      Swal.fire({
        icon: 'warning',
        title: 'Harap Isi Semua Kolom!',
        text: 'Silakan isi semua kolom untuk menambahkan produk.',
        confirmButtonColor: '#9B4D96',
      });
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
      />
      <input
        type="number"
        value={newProduct.harga}
        onChange={(e) => setNewProduct({ ...newProduct, harga: e.target.value })}
        placeholder="Harga Produk"
      />
      <input
        type="text"
        value={newProduct.deskripsi}
        onChange={(e) => setNewProduct({ ...newProduct, deskripsi: e.target.value })}
        placeholder="Deskripsi Produk"
      />
      <input
        type="number"
        value={newProduct.stok}
        onChange={(e) => setNewProduct({ ...newProduct, stok: e.target.value })}
        placeholder="Stok Produk"
      />
      <div className="button-group">
        <button onClick={handleAddProduct}>Tambah</button>
        <button onClick={() => navigate("/product-list")}>Batal</button>
      </div>
    </div>
  );
};

export default Tambah;
