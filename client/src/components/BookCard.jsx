const conditionColors = {
  'Like New': { bg: 'rgba(76,175,130,0.12)', border: 'rgba(76,175,130,0.3)', text: '#4caf82' },
  'Good':     { bg: 'rgba(91,155,213,0.12)', border: 'rgba(91,155,213,0.3)', text: '#5b9bd5' },
  'Fair':     { bg: 'rgba(232,184,75,0.12)', border: 'rgba(232,184,75,0.3)', text: '#e8b84b' },
  'Poor':     { bg: 'rgba(224,90,74,0.12)', border: 'rgba(224,90,74,0.3)', text: '#e05a4a' },
};

const statusColors = {
  'available': { bg: 'rgba(76,175,130,0.12)', text: '#4caf82' },
  'sold':      { bg: 'rgba(224,90,74,0.12)', text: '#e05a4a' },
  'reserved':  { bg: 'rgba(232,184,75,0.12)', text: '#e8b84b' },
};

export default function BookCard({ book, type = 'marketplace', onContact, onMarkSold, onDelete, isMine }) {
  const cond = conditionColors[book.condition] || conditionColors['Good'];
  const stat = statusColors[book.status] || statusColors['available'];

  const s = {
    card: {
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', overflow: 'hidden',
      transition: 'border-color 0.2s, transform 0.25s',
      display: 'flex', flexDirection: 'column',
    },
    top: {
      background: 'linear-gradient(135deg, #1c1c22 0%, #141418 100%)',
      padding: '1.4rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    },
    topGlow: {
      position: 'absolute', top: '-20px', right: '-20px',
      width: '80px', height: '80px',
      background: 'radial-gradient(circle, rgba(232,184,75,0.1), transparent)',
      borderRadius: '50%',
    },
    emoji: { fontSize: '2rem', lineHeight: 1 },
    price: {
      fontFamily: 'Fraunces, serif', fontSize: '1.2rem', fontWeight: 700,
      color: 'var(--gold)', letterSpacing: '-0.02em',
    },
    body: { padding: '1.2rem 1.3rem', flex: 1 },
    courseBadge: {
      display: 'inline-block', padding: '0.2rem 0.6rem',
      background: 'var(--gold-dim)', borderRadius: '4px',
      fontSize: '0.67rem', fontWeight: 600, color: 'var(--gold)',
      letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem',
    },
    title: {
      fontFamily: 'Fraunces, serif', fontSize: '1rem', fontWeight: 600,
      color: 'var(--text)', lineHeight: 1.25, marginBottom: '0.25rem',
    },
    author: { fontSize: '0.78rem', color: 'var(--text3)', fontStyle: 'italic', marginBottom: '0.9rem' },
    footer: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid var(--border)', paddingTop: '0.9rem', marginTop: 'auto',
    },
    seller: { fontSize: '0.75rem', color: 'var(--text2)' },
    sellerName: { color: 'var(--text)', fontWeight: 500 },
    condBadge: {
      padding: '0.18rem 0.6rem', borderRadius: '12px',
      fontSize: '0.68rem', fontWeight: 500,
      background: cond.bg, border: `1px solid ${cond.border}`, color: cond.text,
    },
    statBadge: {
      padding: '0.18rem 0.6rem', borderRadius: '12px',
      fontSize: '0.68rem', fontWeight: 500,
      background: stat.bg, color: stat.text,
    },
    actions: { padding: '0 1.3rem 1.3rem', display: 'flex', gap: '0.5rem', flexDirection: 'column' },
    contactBtn: {
      width: '100%', padding: '0.6rem',
      background: 'var(--gold)', color: '#0d0d0f',
      border: 'none', borderRadius: '8px',
      fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
      transition: 'opacity 0.18s',
    },
    soldBtn: {
      width: '100%', padding: '0.5rem',
      background: 'transparent', color: 'var(--text2)',
      border: '1px solid var(--border2)', borderRadius: '8px',
      fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
    },
    deleteBtn: {
      width: '100%', padding: '0.5rem',
      background: 'rgba(224,90,74,0.1)', color: '#e05a4a',
      border: '1px solid rgba(224,90,74,0.2)', borderRadius: '8px',
      fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
    },
    copies: {
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      fontSize: '0.75rem', color: 'var(--text2)',
    },
    copyDot: (avail) => ({
      width: '8px', height: '8px', borderRadius: '50%',
      background: avail > 0 ? 'var(--green)' : 'var(--red)',
    }),
  };

  if (type === 'library') {
    return (
      <div style={s.card}>
        <div style={s.top}>
          <div style={s.topGlow} />
          <div style={s.emoji}>{book.coverEmoji || '📚'}</div>
          <div style={s.copies}>
            <div style={s.copyDot(book.availableCopies)} />
            {book.availableCopies}/{book.totalCopies} copies
          </div>
        </div>
        <div style={s.body}>
          <div style={s.courseBadge}>{book.course}</div>
          <div style={s.title}>{book.title}</div>
          <div style={s.author}>{book.author}</div>
          <div style={{ ...s.footer, marginTop: 0 }}>
            <div style={s.seller}><span style={{ color: '#4caf82', fontWeight: 500 }}>{book.subject}</span></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>Library</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.card}>
      <div style={s.top}>
        <div style={s.topGlow} />
        <div style={s.emoji}>{book.coverEmoji || '📚'}</div>
        <div style={s.price}>₹{book.price.toLocaleString('en-IN')}</div>
      </div>
      <div style={s.body}>
        <div style={s.courseBadge}>{book.course || book.subject}</div>
        <div style={s.title}>{book.title}</div>
        <div style={s.author}>{book.author}</div>
        <div style={s.footer}>
          <div style={s.seller}>
            By <span style={s.sellerName}>{book.seller?.name || 'Student'}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {isMine && <span style={s.statBadge}>{book.status}</span>}
            <span style={s.condBadge}>{book.condition}</span>
          </div>
        </div>
      </div>
      <div style={s.actions}>
        {!isMine && book.status === 'available' && onContact && (
          <button style={s.contactBtn} onClick={() => onContact(book)}>Contact Seller</button>
        )}
        {isMine && book.status === 'available' && onMarkSold && (
          <button style={s.soldBtn} onClick={() => onMarkSold(book._id, 'sold')}>Mark as Sold</button>
        )}
        {isMine && onDelete && (
          <button style={s.deleteBtn} onClick={() => onDelete(book._id)}>Delete Listing</button>
        )}
      </div>
    </div>
  );
}
