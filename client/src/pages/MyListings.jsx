import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const s = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' },
  header: { marginBottom: '2rem' },
  eyebrow: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' },
  title: { fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' },
  sub: { color: 'var(--text2)', fontSize: '0.9rem' },
  statsRow: { display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' },
  statCard: {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '1.2rem 1.5rem', flex: 1, minWidth: '140px',
  },
  statNum: { fontFamily: 'Fraunces, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' },
  statLabel: { fontSize: '0.78rem', color: 'var(--text2)', marginTop: '0.2rem' },
  addBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.65rem 1.4rem', background: 'var(--gold)', color: '#0d0d0f',
    border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600,
    cursor: 'pointer', marginBottom: '2rem',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem' },
  empty: { textAlign: 'center', padding: '4rem 2rem' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyText: { fontFamily: 'Fraunces, serif', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text2)', marginBottom: '0.5rem' },
  loginRequired: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    minHeight: '50vh', gap: '1rem', color: 'var(--text2)',
  },
  loginBtn: {
    padding: '0.7rem 1.8rem', background: 'var(--gold)', color: '#0d0d0f',
    border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600,
    cursor: 'pointer',
  },
};

export default function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    api.get('/marketplace/my-listings')
      .then(res => setBooks(res.data))
      .catch(() => toast.error('Failed to load listings'))
      .finally(() => setLoading(false));
  }, [user]);

  const handleMarkSold = async (id, status) => {
    try {
      await api.patch(`/marketplace/${id}/status`, { status });
      setBooks(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      toast.success(`Marked as ${status}`);
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return;
    try {
      await api.delete(`/marketplace/${id}`);
      setBooks(prev => prev.filter(b => b._id !== id));
      toast.success('Listing deleted');
    } catch { toast.error('Failed to delete'); }
  };

  if (!user) {
    return (
      <div style={s.page}>
        <div style={s.loginRequired}>
          <div style={{ fontSize: '3rem' }}>🔒</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.3rem', color: 'var(--text)' }}>Login to see your listings</div>
          <button style={s.loginBtn} onClick={() => navigate('/login')}>Login →</button>
        </div>
      </div>
    );
  }

  const available = books.filter(b => b.status === 'available').length;
  const sold = books.filter(b => b.status === 'sold').length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.eyebrow}>📦 Your Account</div>
        <h1 style={s.title}>My Listings</h1>
        <p style={s.sub}>Manage books you're selling, {user.name.split(' ')[0]}.</p>
      </div>

      <div style={s.statsRow}>
        {[
          [books.length, 'Total Listings'],
          [available, 'Available'],
          [sold, 'Sold'],
        ].map(([n, l]) => (
          <div key={l} style={s.statCard}>
            <div style={s.statNum}>{n}</div>
            <div style={s.statLabel}>{l}</div>
          </div>
        ))}
      </div>

      <button style={s.addBtn} onClick={() => setShowAdd(true)}>+ List a New Book</button>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text2)', padding: '3rem' }}>Loading...</div>
      ) : books.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyIcon}>📚</div>
          <div style={s.emptyText}>No listings yet</div>
          <div style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>Start selling your books!</div>
        </div>
      ) : (
        <div style={s.grid}>
          {books.map(book => (
            <BookCard
              key={book._id} book={book} type="marketplace"
              isMine={true}
              onMarkSold={handleMarkSold}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showAdd && (
        <AddBookModal
          type="marketplace"
          onClose={() => setShowAdd(false)}
          onAdded={(book) => setBooks(prev => [book, ...prev])}
        />
      )}
    </div>
  );
}
