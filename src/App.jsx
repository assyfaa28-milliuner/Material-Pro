import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import ProductDetail from './components/ProductDetail'
import Checkout from './components/Checkout'
import Cart from './components/Cart'

function App() {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [currentPage, setCurrentPage] = useState(() => {
        const savedUser = localStorage.getItem('currentUser')
        return savedUser ? 'pos' : 'login'
    })
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('currentUser')
        return saved ? JSON.parse(saved) : null
    })
    
    // Global Cart State
    const [cartItems, setCartItems] = useState([])

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                )
            }
            return [...prevItems, { ...product, quantity }]
        })
        alert(`${product.title} berhasil ditambahkan ke keranjang!`)
    }

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    }

    const updateCartQuantity = (productId, delta) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }).filter(item => item.quantity > 0)); 
        // Filter is a fallback in case we allow deleting via minus button, 
        // but currently we clamp it to >0 or handle removal explicitly if needed.
        // Actually, if newQuantity is 0, let's remove it:
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + delta };
            }
            return item;
        }).filter(item => item.quantity > 0));
    }

    // Dummy database to store users, now persisted
    const [registeredUsers, setRegisteredUsers] = useState(() => {
        const saved = localStorage.getItem('registeredUsers')
        if (saved) return JSON.parse(saved)
        return [
            { name: 'Admin', email: 'admin@materialpro.com', whatsapp: '08123456789', address: 'Jl. Contoh No. 123', password: 'password123' }
        ]
    })

    const handleLogin = (emailOrPhone, password) => {
        const user = registeredUsers.find(
            u => (u.email === emailOrPhone || u.whatsapp === emailOrPhone) && u.password === password
        )
        if (user) {
            setCurrentUser(user)
            localStorage.setItem('currentUser', JSON.stringify(user))
            setCurrentPage('pos')
            return true
        }
        return false
    }

    const handleRegister = (name, whatsapp, email, address, password) => {
        const exists = registeredUsers.find(u => u.whatsapp === whatsapp || (email && u.email === email))
        if (exists) return false // Prevent duplicate phone or email

        const updatedUsers = [...registeredUsers, { name, whatsapp, email, address, password }]
        setRegisteredUsers(updatedUsers)
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
        return true
    }

    const handleLogout = () => {
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
        setCurrentPage('login')
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <Login onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} />
            case 'register':
                return <Register onRegister={handleRegister} onNavigateToLogin={() => setCurrentPage('login')} />
            case 'pos':
                return <Dashboard 
                    currentUser={currentUser} 
                    cartItemCount={cartItems.length}
                    onNavigateToProfile={() => setCurrentPage('profile')} 
                    onProductClick={(product) => { setSelectedProduct(product); setCurrentPage('product-detail'); }} 
                    onCartClick={() => setCurrentPage('cart')}
                />
            case 'cart':
                return <Cart 
                    cartItems={cartItems}
                    onRemoveFromCart={removeFromCart}
                    onUpdateQuantity={updateCartQuantity}
                    onBack={() => setCurrentPage('pos')}
                    onCheckout={() => setCurrentPage('checkout')}
                />
            case 'product-detail':
                return <ProductDetail 
                    product={selectedProduct} 
                    onAddToCart={addToCart}
                    onBack={() => setCurrentPage('pos')} 
                    onBuy={() => { addToCart(selectedProduct, 1); setCurrentPage('checkout') }} 
                />
            case 'checkout':
                return <Checkout 
                    cartItems={cartItems} 
                    onBack={() => setCurrentPage('cart')} 
                    onCompleteCheckout={(paymentMethod) => { 
                        if (paymentMethod === 'cod') {
                            alert('Pesanan Diterima! Silakan siapkan uang tunai untuk dibayarkan kepada kurir saat barang sampai.');
                        } else if (paymentMethod?.startsWith('bank_')) {
                            alert('Detail pemesanan dan instruksi Transfer Bank telah dikirim ke WhatsApp Anda. Pesanan akan diproses setelah pembayaran diterima.');
                        } else {
                            alert('Pembayaran Berhasil! Pesanan sedang diproses.'); 
                        }
                        setCartItems([]); // Clear cart after success
                        setCurrentPage('pos'); 
                    }} 
                />
            case 'profile':
                return <Profile currentUser={currentUser} onLogout={handleLogout} onNavigateToDashboard={() => setCurrentPage('pos')} />
            default:
                return <Login onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} />
        }
    }

    return (
        <div className="w-full min-h-screen bg-neutral-50 font-sans">
            {renderPage()}
        </div>
    )
}

export default App
