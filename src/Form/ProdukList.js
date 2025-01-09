import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios'; // Importing axios
import "../Css/ProdukList.css";
import { API_REGISTER } from '../utils/BaseUrl';

const ProdukList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Retrieve admin data from localStorage
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null;

  useEffect(() => {
    if (idAdmin) {
      axios
        .get(`http://localhost:9080/api/produk/getAllByAdmin/${idAdmin}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [idAdmin]);

  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:9080/api/produk/delete/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        console.log(`Produk dengan ID ${id} berhasil dihapus.`);
        
      })
      .catch((error) => {
        console.error("Error saat menghapus produk:", error);
      });
  };

  const handleAddProduct = (newProduct) => {
    axios
      .post(`${API_REGISTER}`, newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        console.log("Produk berhasil ditambahkan:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error saat menambahkan produk:", error);
      });
  };

  return (
    <div className="product-list">
      <h2>Daftar Produk Boneka</h2>
      <div className="actions">
        <Link to="/tambah-produk">
          <button className="button-add">
            <FaPlusCircle /> Tambah Produk
          </button>
        </Link>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.namaBoneka}</td>
              <td>{`Rp ${product.harga.toLocaleString()}`}</td>
              <td>{product.deskripsi}</td>
              <td>{product.stok}</td>
              <td>
                <Link to={`/edit-produk/${product.id}`}>
                  <button className="button-edit">
                    <FaEdit /> Edit
                  </button>
                </Link>
                <button
                  className="button-delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <FaTrashAlt /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdukList;
