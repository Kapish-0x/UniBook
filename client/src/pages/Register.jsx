import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const s = {
  page: { minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  card: {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '20px', padding: '2.5rem', width: '100%', maxWidth: '460px',
    boxShadow: 'var(--shadow-lg)',
  },
  header: { textAlign: 'center', marginBottom: '2rem' },
  logo: { fontSize: '2.5rem', marginBottom: '0.75rem' },
  title: { fontFamily: 'Fraunces, serif', fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.3rem' },
  titleAccent: { color: 'var(--gold)', fontStyle: 'italic' },
  sub: { color: 'var(--text2)', fontSize: '0.85rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  label: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '0.4rem' },
  input: {
    width: '100%', padding: '0.7rem 1rem',
    background: 'var(--bg3)', border: '1.5px solid var(--border)',
    borderRadius: '10px', color: 'var(--text)', fontSize: '0.9rem', outline: 'none',
  },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  btn: {
    width: '100%', padding: '0.8rem',
    background: 'var(--gold)', color: '#0d0d0f',
    border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700,
    cursor: 'pointer', marginTop: '0.5rem',
  },
  footer: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text2)' },
  link: { color: 'var(--gold)', fontWeight: 600 },
};

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) return toast.error('Name, email and password required');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    try {
      setLoading(true);
      await register(form);
      toast.success('Account created! Welcome to UniBook 🎉');
      navigate('/marketplace');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <style>{`.ub-input:focus { border-color: var(--gold) !important; }`}</style>
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.logo}>🎓</div>
          <h1 style={s.title}>Join <span style={s.titleAccent}>UniBook</span></h1>
          <p style={s.sub}>Create your student account to buy & sell books</p>
        </div>
        <div style={s.form}>
          <div>
            <div style={s.label}>Full Name *</div>
            <input className="ub-input" style={s.input} placeholder="Rahul Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <div style={s.label}>College Email *</div>
            <input className="ub-input" style={s.input} type="email" placeholder="rahul@college.edu" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <div style={s.label}>Password *</div>
            <input className="ub-input" style={s.input} type="password" placeholder="Minimum 6 characters" value={form.password} onChange={e => set('password', e.target.value)} />
          </div>
          <div style={s.row}>
            <div>
              <div style={s.label}>College / University</div>
              <input className="ub-input" style={s.input} placeholder="e.g. IIT Delhi" value={form.college} onChange={e => set('college', e.target.value)} />
            </div>
            <div>
              <div style={s.label}>Phone (optional)</div>
              <input className="ub-input" style={s.input} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>
          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </div>
        <div style={s.footer}>
          Already have an account? <Link to="/login" style={s.link}>Login</Link>
        </div>
      </div>
    </div>
  );
}
