import React, { useState } from 'react';

const Checkout = ({ cartItems, onBack, onCompleteCheckout }) => {
  const [sedekah, setSedekah] = useState(0);
  const [isCustomSedekah, setIsCustomSedekah] = useState(false);
  const [customSedekahValue, setCustomSedekahValue] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState('qris'); // Default QRIS
  const [showQR, setShowQR] = useState(false);
  
  // Shipping details
  const [address, setAddress] = useState('');
  const [courier, setCourier] = useState('reguler');
  const shippingFee = courier === 'cargo' ? 100000 : courier === 'instan' ? 50000 : 25000;

  if (!cartItems || cartItems.length === 0) return null;

  // Calculate Subtotal from array
  const rawSubtotal = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return sum + (priceNum * item.quantity);
  }, 0);

  const activeSedekah = isCustomSedekah ? (parseInt(customSedekahValue, 10) || 0) : sedekah;
  const adminFee = 1000;
  const grandTotal = rawSubtotal + shippingFee + adminFee + activeSedekah;

  const handlePay = () => {
    const checkoutPayload = { grandTotal, address, courier };
    if (paymentMethod === 'qris') {
      setShowQR(true);
    } else {
      // Pass the payment method to the parent for customized success messages
      onCompleteCheckout(paymentMethod, checkoutPayload);
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
            onClick={() => onCompleteCheckout('qris', { grandTotal, address, courier })}
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
        {/* Order Items */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Ringkasan Pesanan</h3>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} onError={(e) => e.target.src="https://placehold.co/400x400?text=Produk"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
                  <p className="text-[#7d0f0f] font-bold mt-1">{item.price}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.quantity}x</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Alamat Pengiriman</h3>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Masukkan alamat lengkap (Jalan, RT/RW, Kecamatan, Kota)..."
            className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:border-[#7d0f0f] focus:ring-1 focus:ring-[#7d0f0f] min-h-[80px]"
          />
        </div>

        {/* Courier Selection */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Pilih Pengiriman</h3>
          <div className="space-y-2">
            {[
              { id: 'reguler', name: 'Reguler (2-3 Hari)', fee: 25000 },
              { id: 'instan', name: 'Instan (Hari yang sama)', fee: 50000 },
              { id: 'cargo', name: 'Cargo (Kapasitas Besar)', fee: 100000 }
            ].map((c) => (
              <label key={c.id} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${courier === c.id ? 'border-[#7d0f0f] bg-red-50/10' : 'border-gray-200'}`}>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{c.name}</span>
                  <span className="text-xs text-gray-500">Rp{c.fee.toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="radio"
                  name="courier"
                  value={c.id}
                  checked={courier === c.id}
                  onChange={() => setCourier(c.id)}
                  className="w-4 h-4 text-[#7d0f0f] focus:ring-[#7d0f0f]"
                />
              </label>
            ))}
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
            {[0, 2000, 5000, -1].map(amount => (
              <button
                key={amount}
                onClick={() => {
                  if (amount === -1) {
                     setIsCustomSedekah(true);
                     setSedekah(0);
                  } else {
                     setIsCustomSedekah(false);
                     setSedekah(amount);
                  }
                }}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                  (isCustomSedekah && amount === -1) || (!isCustomSedekah && sedekah === amount)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {amount === 0 ? 'Nanti' : amount === -1 ? 'Lainnya' : `Rp${(amount/1000)}k`}
              </button>
            ))}
          </div>
          
          {isCustomSedekah && (
            <div className="mt-3 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
              <input 
                type="number" 
                value={customSedekahValue}
                onChange={(e) => setCustomSedekahValue(e.target.value)}
                placeholder="Masukkan nominal sedekah"
                className="w-full pl-9 pr-3 py-2 border border-emerald-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm font-bold text-gray-800"
              />
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Metode Pembayaran</h3>
          <div className="space-y-3">
            
            {/* QRIS */}
            <label className="flex items-center justify-between cursor-pointer group pb-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                  QRIS
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">QRIS</span>
                  <span className="text-[10px] text-gray-500">Menerima Dana, OVO, Gopay, ShopeePay, dll</span>
                </div>
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

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-1">Transfer Bank</h4>

            {/* Bank Transfers */}
            {[
              { id: 'bank_bca', name: 'BCA', desc: 'Transfer Bank BCA' },
              { id: 'bank_bsi', name: 'BSI', desc: 'Transfer Bank Syariah Indonesia' },
              { id: 'bank_bri', name: 'BRI', desc: 'Transfer Bank BRI' },
              { id: 'bank_bni', name: 'BNI', desc: 'Transfer Bank BNI' }
            ].map((bank) => (
              <label key={bank.id} className="flex items-center justify-between cursor-pointer group pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-[10px]">
                    {bank.name}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{bank.desc}</span>
                </div>
                <input 
                  type="radio" 
                  name="payment" 
                  value={bank.id} 
                  checked={paymentMethod === bank.id}
                  onChange={() => setPaymentMethod(bank.id)}
                  className="w-4 h-4 text-[#7d0f0f] focus:ring-[#7d0f0f]"
                />
              </label>
            ))}

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-3 border-t border-gray-50">Lainnya</h4>

            {/* COD */}
            <label className="flex items-center justify-between cursor-pointer group pt-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f2e6e6] flex items-center justify-center text-[#7d0f0f] font-bold text-[10px]">
                  COD
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">Bayar di Tempat (COD)</span>
                  <span className="text-[10px] text-gray-500">Bayar tunai kepada kurir saat pesanan sampai</span>
                </div>
              </div>
              <input 
                type="radio" 
                name="payment" 
                value="cod" 
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
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
              <span>Biaya Pengiriman</span>
              <span>Rp{shippingFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Layanan</span>
              <span>Rp{adminFee.toLocaleString('id-ID')}</span>
            </div>
            {activeSedekah > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Sedekah</span>
                <span>Rp{activeSedekah.toLocaleString('id-ID')}</span>
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
