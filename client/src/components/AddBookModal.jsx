import { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Electronics', 'Civil Engineering', 'Mechanical Engineering', 'Economics', 'English', 'History', 'Management', 'Law', 'Other'];
const EMOJIS = ['📚', '🧪', '📐', '💻', '📊', '⚛️', '🔬', '📝', '🗺️', '⚙️', '📖', '🧮'];

export default function AddBookModal({ type, onClose, onAdded }) {
  const isLibrary = type === 'library';
  const [form, setForm] = useState({
    title: '', author: '', subject: 'Mathematics', course: '',
    description: '', price: '', originalPrice: '', condition: 'Good',
    coverEmoji: '📚', availableCopies: 1, totalCopies: 1,
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title || !form.author) return toast.error('Title and author required');
    if (!isLibrary && !form.price) return toast.error('Price is required');
    try {
      setLoading(true);
      const endpoint = isLibrary ? '/library' : '/marketplace';
      const res = await api.post(endpoint, form);
      toast.success(isLibrary ? 'Book added to library!' : 'Listing published!');
      onAdded(res.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const s = {
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', overflowY: 'auto',
    },
    modal: {
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: '18px', width: '100%', maxWidth: '500px',
      overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
      animation: 'slideUp 0.25s ease',
    },
    header: {
      background: 'linear-gradient(135deg, #1c1c22, #141418)',
      padding: '1.4rem 1.6rem', borderBottom: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    title: { fontFamily: 'Fraunces, serif', fontSize: '1.15rem', fontWeight: 600 },
    titleAccent: { color: 'var(--gold)', fontStyle: 'italic' },
    close: { background: 'none', border: 'none', color: 'var(--text2)', fontSize: '1.2rem', cursor: 'pointer' },
    body: { padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '0.35rem' },
    input: {
      width: '100%', padding: '0.65rem 0.9rem',
      background: 'var(--bg3)', border: '1.5px solid var(--border)',
      borderRadius: '8px', color: 'var(--text)',
      fontSize: '0.88rem', outline: 'none', transition: 'border-color 0.2s',
    },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    emojiGrid: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' },
    emojiBtn: (selected) => ({
      width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.3rem', borderRadius: '8px', cursor: 'pointer',
      background: selected ? 'var(--gold-dim)' : 'var(--bg3)',
      border: selected ? '1.5px solid var(--gold)' : '1.5px solid var(--border)',
      transition: 'all 0.15s',
    }),
    submitBtn: {
      width: '100%', padding: '0.8rem',
      background: 'var(--gold)', color: '#0d0d0f',
      border: 'none', borderRadius: '10px',
      fontSize: '0.9rem', fontWeight: 700,
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.7 : 1,
      marginTop: '0.4rem',
    },
  };

  return (
    <>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform:none } }
        .ub-input:focus { border-color: var(--gold) !important; }
      `}</style>
      <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={s.modal}>
          <div style={s.header}>
            <div style={s.title}>
              {isLibrary ? <>Add to <span style={s.titleAccent}>Library</span></> : <>List a <span style={s.titleAccent}>Book</span></>}
            </div>
            <button style={s.close} onClick={onClose}>✕</button>
          </div>
          <div style={s.body}>
            <div>
              <div style={s.label}>Cover Icon</div>
              <div style={s.emojiGrid}>
                {EMOJIS.map(e => (
                  <button key={e} style={s.emojiBtn(form.coverEmoji === e)} onClick={() => set('coverEmoji', e)}>{e}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={s.label}>Book Title *</div>
              <input className="ub-input" style={s.input} placeholder="e.g. Introduction to Algorithms" value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div>
              <div style={s.label}>Author *</div>
              <input className="ub-input" style={s.input} placeholder="e.g. Cormen et al." value={form.author} onChange={e => set('author', e.target.value)} />
            </div>
            <div style={s.row}>
              <div>
                <div style={s.label}>Subject *</div>
                <select className="ub-input" style={{ ...s.input, appearance: 'none' }} value={form.subject} onChange={e => set('subject', e.target.value)}>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <div style={s.label}>Course Code</div>
                <input className="ub-input" style={s.input} placeholder="e.g. CS301" value={form.course} onChange={e => set('course', e.target.value)} />
              </div>
            </div>

            {isLibrary ? (
              <div style={s.row}>
                <div>
                  <div style={s.label}>Total Copies</div>
                  <input className="ub-input" style={s.input} type="number" min="1" value={form.totalCopies} onChange={e => set('totalCopies', e.target.value)} />
                </div>
                <div>
                  <div style={s.label}>Available Copies</div>
                  <input className="ub-input" style={s.input} type="number" min="0" value={form.availableCopies} onChange={e => set('availableCopies', e.target.value)} />
                </div>
              </div>
            ) : (
              <div style={s.row}>
                <div>
                  <div style={s.label}>Asking Price (₹) *</div>
                  <input className="ub-input" style={s.input} type="number" min="0" placeholder="e.g. 250" value={form.price} onChange={e => set('price', e.target.value)} />
                </div>
                <div>
                  <div style={s.label}>Condition</div>
                  <select className="ub-input" style={{ ...s.input, appearance: 'none' }} value={form.condition} onChange={e => set('condition', e.target.value)}>
                    {['Like New', 'Good', 'Fair', 'Poor'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            <div>
              <div style={s.label}>Description (optional)</div>
              <textarea className="ub-input" style={{ ...s.input, height: '80px', resize: 'vertical' }} placeholder="Any extra details about the book..." value={form.description} onChange={e => set('description', e.target.value)} />
            </div>

            <button style={s.submitBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Publishing...' : isLibrary ? 'Add to Library →' : 'Publish Listing →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
