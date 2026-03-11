import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const s = {
  page: { minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  card: {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '20px', padding: '2.5rem', width: '100%', maxWidth: '420px',
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
    transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%', padding: '0.8rem',
    background: 'var(--gold)', color: '#0d0d0f',
    border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700,
    cursor: 'pointer', marginTop: '0.5rem',
  },
  footer: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text2)' },
  link: { color: 'var(--gold)', fontWeight: 600 },
};

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.email || !form.password) return toast.error('Please fill all fields');
    try {
      setLoading(true);
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/marketplace');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <style>{`.ub-input:focus { border-color: var(--gold) !important; }`}</style>
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.logo}>📖</div>
          <h1 style={s.title}>Welcome to <span style={s.titleAccent}>UniBook</span></h1>
          <p style={s.sub}>Login to your student account</p>
        </div>
        <div style={s.form}>
          <div>
            <div style={s.label}>Email Address</div>
            <input className="ub-input" style={s.input} type="email" placeholder="your@college.edu" value={form.email} onChange={e => set('email', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <div>
            <div style={s.label}>Password</div>
            <input className="ub-input" style={s.input} type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </div>
        <div style={s.footer}>
          New here? <Link to="/register" style={s.link}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
