import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoUsers = [
    { label: 'Student', email: 'arjun.patel@sams.edu', password: 'password', color: '#6366f1' },
    { label: 'Faculty', email: 'priya.sharma@sams.edu', password: 'password', color: '#0ea5e9' },
    { label: 'Admin', email: 'admin@sams.edu', password: 'password', color: '#f59e0b' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Use demo buttons below.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (u) => { setEmail(u.email); setPassword(u.password); setError(''); };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.15)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>🎓</div>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>SAMS</h1>
          <p style={{ color: '#a5b4fc', fontSize: 14 }}>Smart Academic Management System</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e1b4b', marginBottom: 24 }}>Sign In</h2>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="your@email.edu"
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? '#a5b4fc' : '#4f46e5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo users */}
          <div style={{ marginTop: 28 }}>
            <div style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginBottom: 12, fontWeight: 500, letterSpacing: 1 }}>DEMO ACCOUNTS</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {demoUsers.map(u => (
                <button key={u.label} onClick={() => fillDemo(u)}
                  style={{ flex: 1, padding: '9px 4px', border: `1.5px solid ${u.color}`, borderRadius: 8, background: 'transparent', color: u.color, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = u.color; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = u.color; }}>
                  {u.label}
                </button>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 8 }}>Click a role to fill credentials, then Sign In</p>
          </div>
        </div>
      </div>
    </div>
  );
}
