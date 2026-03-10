import React from 'react';

const ProductDetail = ({ product, onBack, onBuy }) => {
  if (!product) return null;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-sans relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-800 ml-2">Detail Produk</h1>
      </div>

      {/* Product Image */}
      <div className="w-full bg-white relative">
        <div className="aspect-square bg-white flex items-center justify-center p-4">
          <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 mt-2">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-[16px] font-medium text-gray-800 leading-snug pr-4">{product.title}</h2>
        </div>
        <div className="text-2xl font-bold text-[#7d0f0f] mb-3">{product.price}</div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#ffb900] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-gray-700">{product.rating}</span>
          </div>
          <span>•</span>
          <span>{product.sold} Terjual</span>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Deskripsi Produk</h3>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            Produk material bangunan berkualitas tinggi dari {product.title.split(' ')[0] || 'Supplier Terpercaya'}. Sangat cocok untuk kebutuhan konstruksi bangunan, renovasi rumah, atau proyek infrastruktur Anda.
            {'\n\n'}
            - Kualitas terjamin (Standar SNI){'\n'}
            - Pengiriman cepat dan aman{'\n'}
            - Stok selalu tersedia
          </p>
        </div>
      </div>

      <div className="pb-20"></div> {/* Spacing for sticky bottom nav */}

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-3 z-50 flex gap-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button className="flex-1 border border-[#7d0f0f] text-[#7d0f0f] font-bold py-2.5 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Chat Penjual
        </button>
        <button 
          onClick={() => onBuy(product)}
          className="flex-1 bg-[#7d0f0f] text-white font-bold py-2.5 rounded-lg hover:bg-[#630b0b] transition-colors shadow-md shadow-[#7d0f0f]/20"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
