import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Css/Edit.css';

const EditProduk = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    namaBoneka: '',
    harga: '',
    deskripsi: '',
    stok: ''
  });
  const navigate = useNavigate();
  const idAdmin = 2;

  useEffect(() => {
    fetch(`http://localhost:9080/api/produk/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error('Error fetching product data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Data',
          text: 'Terjadi kesalahan saat memuat data produk.',
        });
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!product.namaBoneka || !product.harga || !product.deskripsi || !product.stok) {
      Swal.fire({
        icon: 'warning',
        title: 'Harap Isi Semua Kolom!',
        text: 'Silakan isi semua kolom untuk menyimpan produk.',
        confirmButtonColor: '#9B4D96',
      });
      return;
    }

    fetch(`http://localhost:9080/api/produk/editById/${id}?idAdmin=${idAdmin}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Produk Berhasil Diperbarui!',
          text: `Produk ${product.namaBoneka} berhasil diperbarui.`,
          confirmButtonColor: '#9B4D96',
        }).then(() => {
          navigate('/product-list');
        });
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memperbarui Produk!',
          text: 'Terjadi kesalahan saat memperbarui produk.',
        });
      });
  };

  const handleCancel = () => {
    navigate('/product-list'); // Navigasi ke halaman product-list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="edit-form">
      <h2>Edit Produk</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>Nama Produk:</label></td>
              <td>
                <input
                  type="text"
                  name="namaBoneka"
                  value={product.namaBoneka}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label>Harga:</label></td>
              <td>
                <input
                  type="number"
                  name="harga"
                  value={product.harga}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label>Deskripsi:</label></td>
              <td>
                <textarea
                  name="deskripsi"
                  value={product.deskripsi}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label>Stok:</label></td>
              <td>
                <input
                  type="number"
                  name="stok"
                  value={product.stok}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-group">
          <button type="submit" className="save-button">Simpan</button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduk;
