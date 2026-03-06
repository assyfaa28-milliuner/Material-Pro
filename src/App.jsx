import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'

function App() {
    const [currentPage, setCurrentPage] = useState(() => {
        const savedUser = localStorage.getItem('currentUser')
        return savedUser ? 'pos' : 'login'
    })
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('currentUser')
        return saved ? JSON.parse(saved) : null
    })

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
                return <Dashboard currentUser={currentUser} onNavigateToProfile={() => setCurrentPage('profile')} />
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
