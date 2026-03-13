import { useState } from 'react'
import { supabase } from './lib/supabase'
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

    const handleLogin = async (emailOrPhone, password) => {
        try {
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .or(`email.eq.${emailOrPhone},whatsapp.eq.${emailOrPhone}`)
                .eq('password', password)
                .single()

            if (error || !user) {
                console.error("Login Error:", error)
                return false
            }

            setCurrentUser(user)
            localStorage.setItem('currentUser', JSON.stringify(user))
            setCurrentPage('pos')
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }

    const handleRegister = async (name, whatsapp, email, address, password) => {
        try {
            // Check if user exists (Optional, Supabase UK handles it, but good for UX)
            const { data: existingUser } = await supabase
                .from('users')
                .select('id')
                .or(`email.eq.${email},whatsapp.eq.${whatsapp}`)
                .maybeSingle()

            if (existingUser) return false

            const { data, error } = await supabase
                .from('users')
                .insert([{ name, whatsapp, email, address, password }])
                .select()

            if (error) {
                console.error("Registration Error:", error)
                return false
            }

            return true
        } catch (err) {
            console.error(err)
            return false
        }
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
                    onCompleteCheckout={async (paymentMethod, checkoutPayload) => { 
                        try {
                            const { error } = await supabase
                                .from('orders')
                                .insert([{
                                    user_id: currentUser.id,
                                    total_amount: checkoutPayload.grandTotal,
                                    shipping_address: checkoutPayload.address,
                                    courier: checkoutPayload.courier,
                                    payment_method: paymentMethod,
                                    items: cartItems
                                }]);
                                
                            if (error) throw error;

                            if (paymentMethod === 'cod') {
                                alert('Pesanan Diterima! Silakan siapkan uang tunai untuk dibayarkan kepada kurir saat barang sampai.');
                            } else if (paymentMethod?.startsWith('bank_')) {
                                alert('Detail pemesanan dan instruksi Transfer Bank telah dikirim ke WhatsApp Anda. Pesanan akan diproses setelah pembayaran diterima.');
                            } else {
                                alert('Pembayaran Berhasil! Pesanan sedang diproses.'); 
                            }
                            setCartItems([]); // Clear cart after success
                            setCurrentPage('pos'); 
                        } catch (err) {
                            console.error("Order error", err);
                            alert("Gagal memproses pesanan, silakan coba lagi atau cek koneksi database Anda.");
                        }
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
