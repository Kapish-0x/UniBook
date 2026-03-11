import { useState, useEffect } from 'react';
import api from '../api';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SUBJECTS = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Electronics', 'Civil Engineering', 'Mechanical Engineering', 'Economics', 'English', 'Management'];

const s = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' },
  pageHeader: { marginBottom: '2rem' },
  eyebrow: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' },
  title: { fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' },
  sub: { color: 'var(--text2)', fontSize: '0.9rem' },
  toolbar: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' },
  searchWrap: { position: 'relative', flex: 1, minWidth: '220px', maxWidth: '340px' },
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
    fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
    transition: 'all 0.18s', whiteSpace: 'nowrap',
  }),
  addBtn: {
    marginLeft: 'auto', padding: '0.5rem 1.2rem',
    background: 'var(--gold)', color: '#0d0d0f',
    border: 'none', borderRadius: '8px',
    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' },
  divider: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    marginBottom: '1.5rem',
  },
  divLine: { flex: 1, height: '1px', background: 'var(--border)' },
  divText: { fontSize: '0.72rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' },
  empty: { gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--text3)' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyText: { fontFamily: 'Fraunces, serif', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text2)' },
  loading: { gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text2)' },
};

export default function Library() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [showAdd, setShowAdd] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (subject !== 'All') params.subject = subject;
      const res = await api.get('/library', { params });
      setBooks(res.data.books);
    } catch (err) {
      toast.error('Failed to load library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, [search, subject]);

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div style={s.eyebrow}>📚 University Collection</div>
        <h1 style={s.title}>Library Catalog</h1>
        <p style={s.sub}>Browse all books officially available in your university library.</p>
      </div>

      <div style={s.toolbar}>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>🔍</span>
          <input
            style={s.searchInput} placeholder="Search books, authors..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={s.pills}>
          {SUBJECTS.map(sub => (
            <button key={sub} style={s.pill(subject === sub)} onClick={() => setSubject(sub)}>{sub}</button>
          ))}
        </div>
        {user && <button style={s.addBtn} onClick={() => setShowAdd(true)}>+ Add Book</button>}
      </div>

      <div style={s.divider}>
        <div style={s.divLine} />
        <div style={s.divText}>{books.length} books found</div>
        <div style={s.divLine} />
      </div>

      <div style={s.grid}>
        {loading ? (
          <div style={s.loading}>Loading catalog...</div>
        ) : books.length === 0 ? (
          <div style={s.empty}>
            <div style={s.emptyIcon}>📭</div>
            <div style={s.emptyText}>No books found</div>
          </div>
        ) : (
          books.map(book => <BookCard key={book._id} book={book} type="library" />)
        )}
      </div>

      {showAdd && (
        <AddBookModal
          type="library"
          onClose={() => setShowAdd(false)}
          onAdded={(book) => setBooks(prev => [book, ...prev])}
        />
      )}
    </div>
  );
}
