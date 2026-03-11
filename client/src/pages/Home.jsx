import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const s = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem 3rem' },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    background: 'var(--gold-dim)', border: '1px solid rgba(232,184,75,0.25)',
    borderRadius: '20px', padding: '0.3rem 1rem',
    fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)',
    letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem',
  },
  hero: {
    fontFamily: 'Fraunces, serif',
    fontSize: 'clamp(2.8rem, 6vw, 5rem)',
    fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.04em',
    color: 'var(--text)', marginBottom: '1.5rem',
  },
  heroGold: { color: 'var(--gold)', fontStyle: 'italic' },
  sub: {
    fontSize: '1.1rem', color: 'var(--text2)',
    maxWidth: '520px', lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 300,
  },
  btnRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btnGold: {
    padding: '0.8rem 2rem', background: 'var(--gold)', color: '#0d0d0f',
    border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 600,
    cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
    transition: 'all 0.2s',
  },
  btnOutline: {
    padding: '0.8rem 2rem', background: 'transparent',
    color: 'var(--text)', border: '1.5px solid var(--border2)',
    borderRadius: '10px', fontSize: '0.95rem', fontWeight: 500,
    cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
    transition: 'all 0.2s',
  },
  grid: {
    marginTop: '5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '2rem',
    transition: 'border-color 0.2s, transform 0.2s',
  },
  cardIcon: { fontSize: '2.2rem', marginBottom: '1rem' },
  cardTitle: {
    fontFamily: 'Fraunces, serif', fontSize: '1.25rem',
    fontWeight: 600, marginBottom: '0.5rem',
  },
  cardText: { color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.7 },
  statsRow: {
    marginTop: '4rem',
    display: 'flex', gap: '2rem', flexWrap: 'wrap',
    borderTop: '1px solid var(--border)', paddingTop: '3rem',
  },
  stat: { flex: 1, minWidth: '120px' },
  statNum: {
    fontFamily: 'Fraunces, serif', fontSize: '2.5rem',
    fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.04em',
  },
  statLabel: { color: 'var(--text2)', fontSize: '0.82rem', marginTop: '0.25rem' },
};

const features = [
  { icon: '📚', title: 'University Library', text: 'Browse the full collection of books officially available in your university library. Filter by subject or course code.' },
  { icon: '🔄', title: 'Buy & Sell', text: 'Sell second-hand books you no longer need or find affordable ones from fellow students — all in one place.' },
  { icon: '🔒', title: 'Secure & Verified', text: 'Every user is a registered student. Login with your details and trade with confidence within your campus community.' },
];

export default function Home() {
  const { user } = useAuth();
  return (
    <div style={s.page}>
      <div style={s.eyebrow}>📖 UniBook · Campus Marketplace</div>
      <h1 style={s.hero}>
        Your campus.<br />
        Your books.<br />
        <span style={s.heroGold}>Your price.</span>
      </h1>
      <p style={s.sub}>
        Access the university library catalog and trade second-hand academic books directly with fellow students. No middlemen.
      </p>
      <div style={s.btnRow}>
        <Link to="/library" style={s.btnGold}>Explore Library →</Link>
        <Link to="/marketplace" style={s.btnOutline}>Browse Marketplace</Link>
      </div>

      <div style={s.grid}>
        {features.map((f) => (
          <div key={f.title} style={s.card}>
            <div style={s.cardIcon}>{f.icon}</div>
            <div style={s.cardTitle}>{f.title}</div>
            <p style={s.cardText}>{f.text}</p>
          </div>
        ))}
      </div>

      <div style={s.statsRow}>
        {[['500+', 'Library Books'], ['1,200+', 'Students'], ['₹150', 'Avg. Savings'], ['4.8★', 'Rating']].map(([n, l]) => (
          <div key={l} style={s.stat}>
            <div style={s.statNum}>{n}</div>
            <div style={s.statLabel}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
