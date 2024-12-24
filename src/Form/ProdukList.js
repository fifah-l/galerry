import React, { useState } from 'react';
import boneka1 from "../images/boneka1.png";
import boneka2 from "../images/boneka2.png";
import boneka3 from "../images/boneka3.png";
import boneka4 from "../images/boneka4.png";
import boneka5 from "../images/boneka5.png";
import boneka6 from "../images/boneka6.png";
import boneka7 from "../images/boneka7.png";
import boneka8 from "../images/boneka8.png";
import boneka9 from "../images/boneka9.png";
import boneka10 from "../images/boneka10.png";
import boneka11 from "../images/boneka11.png";
import boneka12 from "../images/boneka12.png";
import '../Css/ProdukList.css'; // Tambahkan CSS untuk styling card

const ProdukList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Boneka Teddy', price: 'Rp 100.000', image: boneka1 },
    { id: 2, name: 'Boneka Panda', price: 'Rp 120.000', image: boneka2 },
    { id: 3, name: 'Boneka Unicorn', price: 'Rp 150.000', image: boneka3 },
    { id: 4, name: 'Boneka Labubu', price: 'Rp 122.000', image: boneka4 },
    { id: 5, name: 'Boneka Anjing', price: 'Rp 109.000', image: boneka5 },
    { id: 6, name: 'Boneka Lotso', price: 'Rp 135.000', image: boneka6 },
    { id: 7, name: 'Boneka Kucing', price: 'Rp 98.000', image: boneka7 },
    { id: 8, name: 'Boneka Doraemon', price: 'Rp 90.000', image: boneka8 },
    { id: 9, name: 'Boneka Winnie The Pooh', price: 'Rp 120.000', image: boneka9 },
    { id: 10, name: 'Boneka Pikachu', price: 'Rp 120.000', image: boneka10 },
    { id: 11, name: 'Boneka Cinnamoroll', price: 'Rp 120.000', image: boneka11 },
    { id: 12, name: 'Boneka Hiu', price: 'Rp 120.000', image: boneka12 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: '', price: '', image: '' });
      setShowForm(false);
    } else {
      alert('Silakan isi semua kolom');
    }
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (index) => {
    if (index >= 0 && index < products.length) {
      const updatedName = prompt('Edit Nama Produk:', products[index].name);
      const updatedPrice = prompt('Edit Harga Produk:', products[index].price);
  
      if (updatedName && updatedPrice) {
        const updatedProducts = [...products];
        updatedProducts[index] = { name: updatedName, price: updatedPrice };
        setProducts(updatedProducts);
      }
    } else {
      alert("Produk tidak ditemukan.");
    }
  };
  

  return (
    <div className="product-list">
  <h2>Daftar Produk Boneka</h2>
  <button
    className="button-add"
    onClick={() => setShowForm(!showForm)}
  >
    {showForm ? "Tutup Form" : "Tambah Produk"}
  </button>

  {showForm && (
    <div className="add-product-form">
      <input
        type="text"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Nama Produk"
      />
      <input
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        placeholder="Harga Produk"
      />
      <button className="button-soft" onClick={handleAddProduct}>
        Tambah
      </button>
    </div>
  )}

<ul className="product-list-container">
  {products.map((product, index) => (
    <li key={index} className="product-card">
      <div className="product-image">
        <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p><strong>Harga:</strong> {product.price}</p>
      </div>
      <div className="button-group">
        <button className="button-edit" onClick={() => handleEditProduct(index)}>
          Edit
        </button>
        <button className="button-delete" onClick={() => handleDeleteProduct(index)}>
          Hapus
        </button>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
};

export default ProdukList;
