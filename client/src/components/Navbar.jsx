import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const s = {
  nav: {
    background: 'rgba(13,13,15,0.92)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky', top: 0, zIndex: 100,
    padding: '0 2rem',
    height: '64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'Fraunces, serif',
    fontSize: '1.4rem', fontWeight: 700,
    color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.4rem',
    letterSpacing: '-0.03em',
  },
  logoAccent: { color: 'var(--gold)', fontStyle: 'italic' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '0.25rem' },
  link: (active) => ({
    padding: '0.45rem 1rem',
    borderRadius: '8px',
    fontSize: '0.88rem', fontWeight: '500',
    color: active ? 'var(--gold)' : 'var(--text2)',
    background: active ? 'var(--gold-dim)' : 'transparent',
    transition: 'all 0.18s',
    cursor: 'pointer', border: 'none',
    textDecoration: 'none', display: 'inline-block',
  }),
  right: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  userChip: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.35rem 0.85rem',
    background: 'var(--bg3)', borderRadius: '20px',
    border: '1px solid var(--border)',
    fontSize: '0.82rem', color: 'var(--text2)',
  },
  avatar: {
    width: '26px', height: '26px', borderRadius: '50%',
    background: 'var(--gold-dim)', border: '1.5px solid var(--gold)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600,
  },
  btn: (variant) => ({
    padding: '0.42rem 1.1rem',
    borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500,
    border: variant === 'outline' ? '1.5px solid var(--border2)' : 'none',
    background: variant === 'gold' ? 'var(--gold)' : 'transparent',
    color: variant === 'gold' ? '#0d0d0f' : 'var(--text2)',
    cursor: 'pointer', transition: 'all 0.18s',
  }),
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <nav style={s.nav}>
      <Link to="/" style={s.logo}>
        📖 Uni<span style={s.logoAccent}>Book</span>
      </Link>

      <div style={s.navLinks}>
        <Link to="/" style={s.link(path === '/')}>Home</Link>
        <Link to="/library" style={s.link(path === '/library')}>📚 Library</Link>
        <Link to="/marketplace" style={s.link(path === '/marketplace')}>🛒 Marketplace</Link>
        {user && <Link to="/my-listings" style={s.link(path === '/my-listings')}>My Listings</Link>}
      </div>

      <div style={s.right}>
        {user ? (
          <>
            <div style={s.userChip}>
              <div style={s.avatar}>{user.name[0].toUpperCase()}</div>
              {user.name.split(' ')[0]}
            </div>
            <button style={s.btn('outline')} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ ...s.btn('outline'), display: 'inline-block' }}>Login</Link>
            <Link to="/register" style={{ ...s.btn('gold'), display: 'inline-block' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
