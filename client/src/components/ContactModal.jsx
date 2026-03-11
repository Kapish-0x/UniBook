export default function ContactModal({ book, onClose }) {
  if (!book) return null;
  const seller = book.seller;

  const s = {
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    },
    modal: {
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: '18px', width: '100%', maxWidth: '420px',
      overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
      animation: 'slideUp 0.25s ease',
    },
    header: {
      background: 'var(--bg3)', padding: '1.4rem 1.6rem',
      borderBottom: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    title: { fontFamily: 'Fraunces, serif', fontSize: '1.1rem', fontWeight: 600 },
    close: {
      background: 'none', border: 'none', color: 'var(--text2)',
      fontSize: '1.2rem', cursor: 'pointer',
    },
    body: { padding: '1.6rem' },
    bookInfo: {
      background: 'var(--bg3)', borderRadius: '10px', padding: '1rem 1.2rem',
      marginBottom: '1.4rem', border: '1px solid var(--border)',
    },
    bookTitle: { fontFamily: 'Fraunces, serif', fontSize: '0.95rem', marginBottom: '0.25rem' },
    bookPrice: { color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem' },
    label: {
      fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '0.5rem',
    },
    infoRow: {
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      padding: '0.8rem 1rem', background: 'var(--bg3)',
      borderRadius: '8px', border: '1px solid var(--border)',
      marginBottom: '0.6rem',
    },
    infoIcon: { fontSize: '1.1rem' },
    infoText: { fontSize: '0.88rem', color: 'var(--text)' },
    note: {
      marginTop: '1rem', padding: '0.75rem 1rem',
      background: 'var(--gold-dim)', border: '1px solid rgba(232,184,75,0.2)',
      borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.6,
    },
  };

  return (
    <>
      <style>{`@keyframes slideUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform:none } }`}</style>
      <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={s.modal}>
          <div style={s.header}>
            <div style={s.title}>Contact Seller</div>
            <button style={s.close} onClick={onClose}>✕</button>
          </div>
          <div style={s.body}>
            <div style={s.bookInfo}>
              <div style={s.bookTitle}>{book.title}</div>
              <div style={{ ...s.bookPrice }}>₹{book.price?.toLocaleString('en-IN')}</div>
            </div>
            <div style={s.label}>Seller Info</div>
            <div style={s.infoRow}><span style={s.infoIcon}>👤</span><span style={s.infoText}>{seller?.name || 'Unknown'}</span></div>
            {seller?.phone && <div style={s.infoRow}><span style={s.infoIcon}>📞</span><span style={s.infoText}>{seller.phone}</span></div>}
            {seller?.email && <div style={s.infoRow}><span style={s.infoIcon}>✉️</span><span style={s.infoText}>{seller.email}</span></div>}
            {seller?.college && <div style={s.infoRow}><span style={s.infoIcon}>🏫</span><span style={s.infoText}>{seller.college}</span></div>}
            <div style={s.note}>💡 Reach out directly to discuss the condition, arrange a meetup, or negotiate the price.</div>
          </div>
        </div>
      </div>
    </>
  );
}
