import React, { useState } from 'react';
import '../Css/Galerry.css';
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
import Swal from 'sweetalert2'; // Mengimpor SweetAlert2

const Galerry = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dolls = [
    { id: 1, name: 'Boneka Teddy', images: boneka1, price: 'Rp 100.000' },
    { id: 2, name: 'Boneka Panda', images: boneka2, price: 'Rp 120.000' },
    { id: 3, name: 'Boneka Unicorn', images: boneka3, price: 'Rp 150.000' },
    { id: 4, name: 'Boneka Labubu', images: boneka4, price: 'Rp 122.000' },
    { id: 5, name: 'Boneka Anjing', images: boneka5, price: 'Rp 109.000' },
    { id: 6, name: 'Boneka Lotso', images: boneka6, price: 'Rp 135.000' },
    { id: 7, name: 'Boneka Kucing', images: boneka7, price: 'Rp 98.000' },
    { id: 8, name: 'Boneka Doraemon', images: boneka8, price: 'Rp 90.000' },
    { id: 9, name: 'Boneka Winnie The Pooh', images: boneka9, price: 'Rp 120.000' },
    { id: 10, name: 'Boneka Pikachu', images: boneka10, price: 'Rp 89.000' },
    { id: 11, name: 'Boneka Cinnamoroll', images: boneka11, price: 'Rp 110.000' },
    { id: 12, name: 'Boneka Hiu', images: boneka12, price: 'Rp 131.000' },
  ];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDolls = dolls.filter((doll) =>
    doll.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrder = (dollName) => {
    Swal.fire({
      icon: 'success',
      title: 'Pesanan Berhasil!',
      text: `Anda telah memesan ${dollName}. Terima kasih!`,
      confirmButtonColor: '#9B4D96', // Warna ungu soft
    });
  };

  return (
    <div className="gallery">
      <h2>Selamat datang di gallery boneka! ✨</h2>
      <p className="p">
        Temukan koleksi boneka berkualitas yang memancarkan kehangatan. 
        Jadikan hari spesial lebih berkesan dengan hadiah yang sempurna ini!
      </p>
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Cari boneka..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="card-container">
        {filteredDolls.length > 0 ? (
          filteredDolls.map((doll) => (
            <div className="card" key={doll.id}>
              <img src={doll.images} alt={doll.name} className="card-image" />
              <div className="card-content">
                <h3>{doll.name}</h3>
                <p><strong>Harga:</strong> {doll.price}</p>
                <button className="order-button" onClick={() => handleOrder(doll.name)}>
                  Pesan Sekarang
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Boneka tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default Galerry;
