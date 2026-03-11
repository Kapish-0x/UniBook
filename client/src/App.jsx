import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Library from './pages/Library';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1c1c20',
              color: '#f0ece4',
              border: '1px solid #2a2a30',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.88rem',
            },
            success: { iconTheme: { primary: '#4caf82', secondary: '#1c1c20' } },
            error: { iconTheme: { primary: '#e05a4a', secondary: '#1c1c20' } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
