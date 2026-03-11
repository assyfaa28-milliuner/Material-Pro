import React from 'react';
import imgPipaRucika from '../assets/images/pipa-rucika.png';

const Cart = ({ onBack, onCheckout }) => {
  // Mock cart items for demonstration
  const cartItems = [
    {
      id: 1,
      title: "Semen Tiga Roda 50kg",
      price: "Rp55.000",
      quantity: 1,
      image: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/4/20/0e48756c-0e86-4444-aee3-b3c95a054db7.jpg"
    },
    {
      id: 2,
      title: "Pipa PVC Rucika 3 Inch D",
      price: "Rp110.000",
      quantity: 2,
      image: imgPipaRucika
    }
  ];

  const totalOrigin = 55000 + (110000 * 2);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-sans pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-800 ml-2">Keranjang Belanja</h1>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex gap-3">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
               {/* Using placehold if the image URL fails locally */}
               <img src={item.image} onError={(e) => e.target.src="https://placehold.co/400x400?text=Produk"} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.title}</h3>
              <p className="text-[#7d0f0f] font-bold mt-1">{item.price}</p>
              
              {/* Fake Quantity Control */}
              <div className="flex items-center justify-end mt-auto gap-3">
                 <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100">-</button>
                 <span className="text-sm font-bold">{item.quantity}</span>
                 <button className="w-6 h-6 rounded-full border border-[#7d0f0f] flex items-center justify-center text-[#7d0f0f] hover:bg-[#7d0f0f]/10">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 font-medium">Total Estimasi</span>
          <span className="text-lg font-bold text-[#7d0f0f]">Rp{totalOrigin.toLocaleString('id-ID')}</span>
        </div>
        <button 
          onClick={() => onCheckout(cartItems[0])} // Pass the first item for testing checkout flow
          className="w-full bg-[#7d0f0f] text-white font-bold py-3.5 rounded-xl hover:bg-[#630b0b] shadow-md shadow-[#7d0f0f]/20 transition-all active:scale-[0.98]"
        >
          Checkout Semua ({cartItems.length})
        </button>
      </div>
    </div>
  );
};

export default Cart;
