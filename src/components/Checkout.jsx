import React, { useState } from 'react';

const Checkout = ({ product, onBack, onCompleteCheckout }) => {
  const [sedekah, setSedekah] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('qris'); // Default QRIS
  const [showQR, setShowQR] = useState(false);

  if (!product) return null;

  // Helper to parse Rp String to Number
  const getProductPriceNumber = () => {
    return parseInt(product.price.replace(/[^0-9]/g, ''), 10);
  };

  const productPrice = getProductPriceNumber();
  const rawSubtotal = productPrice;
  const adminFee = 1000;
  const grandTotal = rawSubtotal + adminFee + sedekah;

  const handlePay = () => {
    if (paymentMethod === 'qris') {
      setShowQR(true);
    } else {
      // Simulate other payment success
      onCompleteCheckout();
    }
  };

  if (showQR) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col font-sans">
        <div className="bg-white px-4 py-3 flex items-center shadow-sm">
          <button onClick={() => setShowQR(false)} className="p-2 -ml-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-800 ml-2">Bayar dengan QRIS</h1>
        </div>

        <div className="flex-1 flex flex-col items-center p-6 mt-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full flex flex-col items-center">
            <h2 className="font-bold mb-4 text-[#7d0f0f] text-xl">Material Pro</h2>
            {/* Mock QR Barcode */}
            <div className="w-48 h-48 bg-gray-100 p-2 mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                alt="QRIS Barcode" 
                className="w-full h-full object-contain mix-blend-multiply opacity-80" 
              />
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Tagihan:</p>
            <p className="font-bold text-2xl text-gray-800 mb-6">Rp{grandTotal.toLocaleString('id-ID')}</p>
            
            <p className="text-center text-xs text-gray-400">Scan QR code ini menggunakan aplikasi<br/>M-Banking atau e-Wallet Anda.</p>
          </div>

          <button 
            onClick={onCompleteCheckout}
            className="mt-8 w-full bg-[#7d0f0f] text-white font-bold py-3.5 rounded-xl hover:bg-[#630b0b] shadow-md transition-colors"
          >
            SAYA SUDAH BAYAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-sans pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-800 ml-2">Checkout</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Item */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Ringkasan Pesanan</h3>
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
               <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{product.title}</p>
              <p className="text-[#7d0f0f] font-bold mt-1">{product.price}</p>
              <p className="text-xs text-gray-400 mt-1">1x</p>
            </div>
          </div>
        </div>

        {/* Sedekah Section */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
              <h3 className="font-bold text-gray-800">Sedekah Pembangunan Umat</h3>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Berbagi kebaikan bersama Material Pro. Salurkan bantuan Anda untuk renovasi masjid dan sarana umum.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[0, 2000, 5000, 10000].map(amount => (
              <button
                key={amount}
                onClick={() => setSedekah(amount)}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                  sedekah === amount 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {amount === 0 ? 'Silang' : `Rp${(amount/1000)}k`}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Metode Pembayaran</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                  QRIS
                </div>
                <span className="text-sm font-medium text-gray-800">QRIS (Gopay, OVO, Dana)</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                value="qris" 
                checked={paymentMethod === 'qris'}
                onChange={() => setPaymentMethod('qris')}
                className="w-4 h-4 text-[#7d0f0f] focus:ring-[#7d0f0f]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group pt-2 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-[10px]">
                  BCA
                </div>
                <span className="text-sm font-medium text-gray-800">Transfer Bank BCA</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                value="bca" 
                checked={paymentMethod === 'bca'}
                onChange={() => setPaymentMethod('bca')}
                className="w-4 h-4 text-[#7d0f0f] focus:ring-[#7d0f0f]"
              />
            </label>
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Rincian Pembayaran</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal Produk</span>
              <span>Rp{rawSubtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Layanan</span>
              <span>Rp{adminFee.toLocaleString('id-ID')}</span>
            </div>
            {sedekah > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Sedekah</span>
                <span>Rp{sedekah.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-100 mt-2">
              <span>Total Belanja</span>
              <span className="text-[#7d0f0f]">Rp{grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Checkout Button */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handlePay}
          className="w-full bg-[#7d0f0f] text-white font-bold py-3.5 rounded-xl hover:bg-[#630b0b] shadow-md shadow-[#7d0f0f]/20 transition-all active:scale-[0.98]"
        >
          {paymentMethod === 'qris' ? 'Bayar dengan QRIS' : 'Lanjutkan Pembayaran'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
