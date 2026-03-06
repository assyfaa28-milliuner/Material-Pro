import React, { useState } from 'react';

const Login = ({ onLogin, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      const success = onLogin(email, password);

      if (!success) {
        throw new Error('Email atau kata sandi tidak valid');
      }

      // If success, App.jsx handles the redirect

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24 px-6">
      <div className="w-full max-w-sm">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-[#7d0f0f] rounded-[1.25rem] flex items-center justify-center shadow-sm mb-4">
            {/* Box Icon */}
            <svg className="w-10 h-10 text-[#ffb900] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7.5L12 3L4 7.5l8 4.5zm0 0v9l-8 4.5m0-4.5v-9m-8 4.5v9l8 4.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-[#7d0f0f]">MATERIAL </span>
            <span className="text-[#ffb900]">PRO</span>
          </h1>
          <p className="text-gray-400 text-xs font-bold tracking-[0.2em] mt-1">SOLUSI BANGUNAN</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6 border border-red-100 font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7d0f0f] focus:border-[#7d0f0f] outline-none transition text-sm text-gray-800 placeholder-gray-400"
              placeholder="Email / No Handphone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7d0f0f] focus:border-[#7d0f0f] outline-none transition text-sm text-gray-800 placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7d0f0f] hover:bg-[#5c0b0b] active:bg-[#4a0808] disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition duration-200 shadow-sm mt-2 flex justify-center items-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'LOG IN'
            )}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-5 text-[11px] font-bold text-blue-600">
          <button className="hover:underline">Lupa Password?</button>
          <button className="hover:underline">Login dengan SMS</button>
        </div>

        {/* Divider */}
        <div className="relative mt-10 mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-[11px] font-bold text-gray-400">ATAU</span>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={onNavigateToRegister}
          disabled={isLoading}
          className="w-full bg-white border border-[#7d0f0f] text-[#7d0f0f] hover:bg-rose-50 active:bg-rose-100 font-bold py-3.5 rounded-xl transition duration-200"
        >
          DAFTAR AKUN BARU
        </button>

        {/* Terms */}
        <p className="text-center text-[10px] text-gray-400 mt-6 leading-relaxed">
          Dengan login, Anda menyetujui <button className="text-blue-500 hover:underline">Syarat & Ketentuan</button> Material Pro.
        </p>

      </div>
    </div>
  );
};

export default Login;
