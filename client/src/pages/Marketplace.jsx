import { useState, useEffect } from 'react';
import api from '../api';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import ContactModal from '../components/ContactModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SUBJECTS = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Electronics', 'Economics', 'English', 'Management', 'Other'];
const CONDITIONS = ['Any', 'Like New', 'Good', 'Fair', 'Poor'];

const s = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  pageHeader: {},
  eyebrow: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' },
  title: { fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' },
  sub: { color: 'var(--text2)', fontSize: '0.9rem' },
  sellBtn: {
    padding: '0.65rem 1.4rem', background: 'var(--gold)', color: '#0d0d0f',
    border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600,
    cursor: 'pointer', whiteSpace: 'nowrap', alignSelf: 'flex-end',
  },
  toolbar: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' },
  searchWrap: { position: 'relative', flex: 1, minWidth: '220px', maxWidth: '320px' },
  searchIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: '0.85rem' },
  searchInput: {
    width: '100%', padding: '0.6rem 0.9rem 0.6rem 2.2rem',
    background: 'var(--bg2)', border: '1.5px solid var(--border)',
    borderRadius: '8px', color: 'var(--text)', fontSize: '0.88rem', outline: 'none',
  },
  pills: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' },
  pill: (active) => ({
    padding: '0.38rem 0.9rem', borderRadius: '20px',
    border: `1.5px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
    background: active ? 'var(--gold-dim)' : 'transparent',
    color: active ? 'var(--gold)' : 'var(--text2)',
    fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.18s',
  }),
  divider: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
  divLine: { flex: 1, height: '1px', background: 'var(--border)' },
  divText: { fontSize: '0.72rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem' },
  empty: { gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyText: { fontFamily: 'Fraunces, serif', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text2)', marginBottom: '0.5rem' },
  loading: { gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text2)' },
  loginNudge: {
    background: 'var(--gold-dim)', border: '1px solid rgba(232,184,75,0.2)',
    borderRadius: '10px', padding: '1rem 1.5rem',
    fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '1.5rem',
    display: 'flex', alignItems: 'center', gap: '0.75rem',
  },
  loginLink: { color: 'var(--gold)', fontWeight: 600, cursor: 'pointer' },
};

export default function Marketplace() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [condition, setCondition] = useState('Any');
  const [showAdd, setShowAdd] = useState(false);
  const [contactBook, setContactBook] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (subject !== 'All') params.subject = subject;
      if (condition !== 'Any') params.condition = condition;
      const res = await api.get('/marketplace', { params });
      setBooks(res.data.books);
    } catch (err) {
      toast.error('Failed to load marketplace');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, [search, subject, condition]);

  const handleSellClick = () => {
    if (!user) { navigate('/login'); return; }
    setShowAdd(true);
  };

  return (
    <div style={s.page}>
      <div style={s.topRow}>
        <div style={s.pageHeader}>
          <div style={s.eyebrow}>🛒 Student Marketplace</div>
          <h1 style={s.title}>Buy & Sell Books</h1>
          <p style={s.sub}>Trade second-hand books directly with fellow students.</p>
        </div>
        <button style={s.sellBtn} onClick={handleSellClick}>+ Sell a Book</button>
      </div>

      {!user && (
        <div style={s.loginNudge}>
          💡 <span><span style={s.loginLink} onClick={() => navigate('/login')}>Log in</span> to sell books or contact sellers.</span>
        </div>
      )}

      <div style={s.toolbar}>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>🔍</span>
          <input style={s.searchInput} placeholder="Search books, authors, courses..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={s.pills}>
          {SUBJECTS.map(sub => (
            <button key={sub} style={s.pill(subject === sub)} onClick={() => setSubject(sub)}>{sub}</button>
          ))}
        </div>
        <div style={s.pills}>
          {CONDITIONS.map(c => (
            <button key={c} style={s.pill(condition === c)} onClick={() => setCondition(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div style={s.divider}>
        <div style={s.divLine} />
        <div style={s.divText}>{books.length} listings available</div>
        <div style={s.divLine} />
      </div>

      <div style={s.grid}>
        {loading ? (
          <div style={s.loading}>Loading marketplace...</div>
        ) : books.length === 0 ? (
          <div style={s.empty}>
            <div style={s.emptyIcon}>📭</div>
            <div style={s.emptyText}>No listings found</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>Be the first to list a book!</div>
          </div>
        ) : (
          books.map(book => (
            <BookCard
              key={book._id}
              book={book}
              type="marketplace"
              onContact={user ? setContactBook : () => navigate('/login')}
            />
          ))
        )}
      </div>

      {showAdd && (
        <AddBookModal
          type="marketplace"
          onClose={() => setShowAdd(false)}
          onAdded={(book) => setBooks(prev => [book, ...prev])}
        />
      )}

      {contactBook && <ContactModal book={contactBook} onClose={() => setContactBook(null)} />}
    </div>
  );
}
