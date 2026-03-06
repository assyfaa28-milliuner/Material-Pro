import React, { useState } from 'react';

const Register = ({ onRegister, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (name.length < 3) {
      setError('Nama harus minimal 3 karakter.');
      setIsLoading(false);
      return;
    }
    if (whatsapp.length < 10) {
      setError('Nomor WhatsApp tidak valid.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      setIsLoading(false);
      return;
    }
    if (address.length < 10) {
      setError('Alamat pengiriman terlalu pendek.');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const success = onRegister(name, whatsapp, email, address, password);

      if (success) {
        onNavigateToLogin();
      } else {
        setError('Pendaftaran gagal. Nomor WhatsApp atau Email mungkin sudah terdaftar.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-6">
      <div className="w-full max-w-sm">

        {/* Top Navbar */}
        <div className="flex items-center mb-8">
          <button onClick={onNavigateToLogin} className="p-2 -ml-2 text-gray-400 hover:text-gray-800 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="ml-2 text-lg font-bold text-[#001f3f]">Daftar Akun</h2>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#7d0f0f] rounded-2xl flex items-center justify-center shadow-sm mb-3">
            <svg className="w-8 h-8 text-[#ffb900] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7.5L12 3L4 7.5l8 4.5zm0 0v9l-8 4.5m0-4.5v-9m-8 4.5v9l8 4.5" />
            </svg>
          </div>
          <h1 className="text-xl font-black tracking-tight">
            <span className="text-[#7d0f0f]">MATERIAL </span>
            <span className="text-[#ffb900]">PRO</span>
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6 border border-red-100 font-medium">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Nama Lengkap */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-4.5 w-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7d0f0f] focus:border-[#7d0f0f] outline-none transition text-[13px] text-gray-800 placeholder-gray-400"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Nomor WhatsApp */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-4.5 w-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              type="tel"
              className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7d0f0f] focus:border-[#7d0f0f] outline-none transition text-[13px] text-gray-800 placeholder-gray-400"
              placeholder="Nomor WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Email (Opsional) */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-4.5 w-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7d0f0f] focus:border-[#7d0f0f] outline-none transition text-[13px] text-gray-800 placeholder-gray-400"
              placeholder="Email (Opsional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Alamat Lengkap */}
          <div className="relative">
            <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
              <svg className="h-4.5 w-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <textarea
              className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7d0f0f] focus:border-[#7d0f0f] outline-none transition text-[13px] text-gray-800 placeholder-gray-400 min-h-[80px] resize-none"
              placeholder="Alamat Lengkap Pengiriman"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Baru */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-4.5 w-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7d0f0f] focus:border-[#7d0f0f] outline-none transition text-[13px] text-gray-800 placeholder-gray-400"
              placeholder="Password Baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7d0f0f] hover:bg-[#5c0b0b] active:bg-[#4a0808] disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition duration-200 shadow-sm mt-4 flex justify-center items-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'DAFTAR SEKARANG'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;
