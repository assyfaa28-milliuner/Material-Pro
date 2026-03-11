import React, { useState } from 'react';
import imgSemenTigaRoda from '../assets/images/semen-tiga-roda.jpg';
import imgCatDulux from '../assets/images/cat-dulux.png';
import imgPipaRucika from '../assets/images/pipa-rucika.png';
import imgBataMerah from '../assets/images/bata-merah.png';

const productList = [
  {
    id: 1,
    image: imgSemenTigaRoda,
    title: "Semen Tiga Roda 50kg",
    price: "Rp55.000",
    rating: "4.8",
    sold: "10rb+"
  },
  {
    id: 2,
    image: imgCatDulux,
    title: "Cat Dulux WeatherShield Putih 5kg",
    price: "Rp240.000",
    rating: "4.7",
    sold: "2rb+"
  },
  {
    id: 3,
    image: imgPipaRucika,
    title: "Pipa PVC Rucika 3 Inch D (4 Meter)",
    price: "Rp110.000",
    rating: "4.5",
    sold: "3rb+"
  },
  {
    id: 4,
    image: imgBataMerah,
    title: "Batu Bata Merah Oven Berkualitas (1000 Pcs)",
    price: "Rp800.000",
    rating: "4.6",
    sold: "15rb+"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1542153508-d890a886fd9a?w=400&q=80",
    title: "Kayu Usuk Borneo 4x6 Kering (Per Batang)",
    price: "Rp45.000",
    rating: "4.4",
    sold: "7rb+"
  }
];

const Dashboard = ({ currentUser, onNavigateToProfile, onProductClick, onCartClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = productList.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center pb-20">
      <div className="w-full max-w-md bg-[#f5f5f5] min-h-screen relative shadow-sm">

        {/* Header - Maroon Background */}
        <div className="bg-[#7d0f0f] px-4 py-4 sticky top-0 z-50 rounded-b-xl">
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari semen, cat, besi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white rounded-md text-sm outline-none placeholder-gray-400 text-gray-800"
              />
            </div>

            <div className="flex items-center gap-3 text-white">
              <button onClick={onCartClick} className="relative p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span className="absolute top-0 right-0 bg-[#ffb900] text-[#7d0f0f] text-[10px] font-bold px-1.5 py-0.5 rounded-full transform translate-x-1 -translate-y-1">1</span>
              </button>
              <button className="p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Promo Banner inside Header */}
          <div className="mt-4 bg-[#dab008] rounded-xl overflow-hidden relative shadow-md h-32 flex items-center p-5">
            <div className="absolute -right-4 -bottom-8 opacity-20 transform rotate-12">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20,8.18V8a2,2,0,0,0-1.2-1.84l-6.28-2.61,0,0A1.85,1.85,0,0,0,11.83,3.5L5.27,5.92A2,2,0,0,0,4,7.79V15.82a2,2,0,0,0,1.2,1.84l6.28,2.61a1.94,1.94,0,0,0,.74.15,1.88,1.88,0,0,0,.69-.13L19.46,17.9A2,2,0,0,0,20,16V8.18ZM11.36,5.34l5.37,2.23-5,1.87L6.37,7.21ZM11,18.84,5.63,16.6v-7.8l5.37,2Z"></path>
              </svg>
            </div>

            <div className="z-10 text-[#001f3f]">
              <h2 className="text-xl font-extrabold tracking-tight leading-tight">PROMO GAJIAN!</h2>
              <p className="font-bold text-sm mt-1">Diskon Material s/d 20%</p>
              <button className="mt-3 text-[10px] font-bold text-white bg-transparent border border-white hover:bg-white/20 transition px-3 py-1.5 rounded uppercase tracking-wider">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-4 px-4 py-6 bg-white rounded-b-3xl shadow-sm mb-4">
          <CategoryBtn icon="🏗️" label="Semen" />
          <CategoryBtn icon="🔗" label="Besi" />
          <CategoryBtn icon="🎨" label="Cat" />
          <CategoryBtn icon="🚰" label="Pipa" />
          <CategoryBtn icon="🪵" label="Kayu" />
          <CategoryBtn icon="🧱" label="Bata" />
          <CategoryBtn icon="🛠️" label="Alat" />
          <CategoryBtn icon="🏷️" label="Promo" />
        </div>

        {/* Product Section */}
        <div className="px-4 py-2">
          <div className="flex justify-center mb-4">
            <h3 className="text-sm font-bold text-[#7d0f0f] uppercase tracking-widest border-b-2 border-[#7d0f0f] pb-1 px-4 text-center">
              Produk Terbaru
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  sold={product.sold}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-gray-500">
                <p>Produk "{searchTerm}" tidak ditemukan.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex py-2 px-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <BottomNavBtn icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />} label="Beranda" active />
          <BottomNavBtn icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />} label="Feed" />
          <BottomNavBtn icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />} label="Notifikasi" />
          <BottomNavBtn icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />} label="Saya" onClick={onNavigateToProfile} />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const CategoryBtn = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer group">
    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-xl group-hover:shadow-[0_4px_12px_rgba(125,15,15,0.15)] transition-all group-hover:-translate-y-1">
      {icon}
    </div>
    <span className="text-xs text-gray-700">{label}</span>
  </div>
);

const ProductCard = ({ image, title, price, rating, sold, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
    <div className="relative aspect-square bg-gray-100">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 bg-[#ffb900] text-[#001f3f] text-[10px] font-bold px-2 py-0.5 rounded-br-lg">
        Star
      </div>
    </div>
    <div className="p-3 flex flex-col flex-grow">
      <h4 className="text-[13px] text-gray-800 leading-tight mb-2 line-clamp-2">{title}</h4>
      <div className="mt-auto">
        <div className="text-[#7d0f0f] font-bold text-sm mb-2">{price}</div>
        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-[#ffb900] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span className="font-medium text-gray-600">{rating}</span>
          </div>
          <span>{sold} Terjual</span>
        </div>
      </div>
    </div>
  </div>
);

const BottomNavBtn = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 pb-1 cursor-pointer ${active ? 'text-[#7d0f0f]' : 'text-gray-400 hover:text-gray-600'}`}
  >
    <svg className={`w-6 h-6 mb-1 ${active ? 'fill-[#7d0f0f]/10' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icon}
    </svg>
    <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
  </button>
);

export default Dashboard;
