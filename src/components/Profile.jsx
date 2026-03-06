import React from 'react';

const Profile = ({ currentUser, onLogout, onNavigateToDashboard }) => {
    const userName = currentUser?.name || currentUser?.email || 'Bapak Pelanggan';

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex justify-center pb-20">
            <div className="w-full max-w-md bg-[#f5f5f5] min-h-screen relative shadow-sm">

                {/* Header - Maroon Background */}
                <div className="bg-[#7d0f0f] px-6 pt-10 pb-8 rounded-b-xl relative">
                    <button
                        onClick={onLogout}
                        className="absolute top-6 right-6 text-white hover:text-gray-200 transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4">
                        {/* Outline Avatar */}
                        <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center bg-white/5">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>

                        <div className="text-white">
                            <h2 className="text-xl font-bold tracking-tight mb-1">{userName}</h2>
                            <div className="flex gap-2">
                                <span className="text-[10px] bg-white/10 border border-white/20 px-2 py-0.5 rounded font-medium">
                                    Silver Member
                                </span>
                                <span className="text-[10px] bg-[#ffb900] text-[#7d0f0f] px-2 py-0.5 rounded font-bold">
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu List */}
                <div className="px-4 mt-6">
                    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden text-sm">

                        <MenuRow label="Pesanan Saya" />
                        <MenuRow label="Voucher Saya" />
                        <MenuRow label="Alamat Pengiriman" />
                        <MenuRow label="Pusat Bantuan" />
                        <MenuRow label="Pengaturan Akun" isLast />

                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex py-2 px-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <BottomNavBtn
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                        label="Beranda"
                        onClick={onNavigateToDashboard}
                    />
                    <BottomNavBtn
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />}
                        label="Feed"
                    />
                    <BottomNavBtn
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />}
                        label="Notifikasi"
                    />
                    <BottomNavBtn
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                        label="Saya"
                        active
                    />
                </div>
            </div>
        </div>
    );
};

const MenuRow = ({ label, isLast }) => (
    <div className={`px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition ${!isLast ? 'border-b border-gray-100' : ''}`}>
        <span className="text-gray-700 font-medium">{label}</span>
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
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

export default Profile;
