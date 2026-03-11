import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onBack, onCheckout }) => {
  const totalOrigin = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return sum + (priceNum * item.quantity);
  }, 0);

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
        {cartItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>Keranjang Anda masih kosong</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex gap-3">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                 <img src={item.image} onError={(e) => e.target.src="https://placehold.co/400x400?text=Produk"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug pr-2">{item.title}</h3>
                  <button onClick={() => onRemoveFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1 -mr-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className="text-[#7d0f0f] font-bold mt-1">{item.price}</p>
                
                <div className="flex items-center justify-between mt-auto">
                   <span className="text-xs text-gray-500">Kuantitas:</span>
                   <div className="flex items-center gap-3">
                     <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">-</button>
                     <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                     <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 rounded-full border border-[#7d0f0f] flex items-center justify-center text-[#7d0f0f] hover:bg-[#7d0f0f]/10 transition-colors">+</button>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 font-medium">Total Estimasi</span>
          <span className="text-lg font-bold text-[#7d0f0f]">Rp{totalOrigin.toLocaleString('id-ID')}</span>
        </div>
        <button 
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className={`w-full py-3.5 rounded-xl text-white font-bold shadow-md transition-all ${
            cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-[#7d0f0f] hover:bg-[#630b0b] shadow-[#7d0f0f]/20 active:scale-[0.98]'
          }`}
        >
          Checkout Semua ({cartItems.length})
        </button>
      </div>
    </div>
  );
};

export default Cart;
