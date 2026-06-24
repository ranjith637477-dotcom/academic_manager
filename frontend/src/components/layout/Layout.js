import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const icons = {
  home: '🏠', leave: '📋', attendance: '✅', marks: '📊',
  complaints: '📢', notes: '📖', placement: '💼', team: '👥',
  certificate: '🎓', logout: '🚪', menu: '☰', close: '✕',
  bell: '🔔', user: '👤', admin: '⚙️'
};

const studentNav = [
  { label: 'Dashboard', path: '/', icon: icons.home },
  { label: 'Leave / OD', path: '/leave', icon: icons.leave },
  { label: 'Attendance', path: '/attendance', icon: icons.attendance },
  { label: 'Marks', path: '/marks', icon: icons.marks },
  { label: 'Complaints', path: '/complaints', icon: icons.complaints },
  { label: 'Notes', path: '/notes', icon: icons.notes },
  { label: 'Placements', path: '/placement', icon: icons.placement },
  { label: 'Team Finder', path: '/team-finder', icon: icons.team },
  { label: 'Certificates', path: '/certificates', icon: icons.certificate },
];

const facultyNav = [
  { label: 'Dashboard', path: '/', icon: icons.home },
  { label: 'Attendance', path: '/attendance', icon: icons.attendance },
  { label: 'Marks', path: '/marks', icon: icons.marks },
  { label: 'Leave Requests', path: '/leave', icon: icons.leave },
  { label: 'Notes', path: '/notes', icon: icons.notes },
  { label: 'Complaints', path: '/complaints', icon: icons.complaints },
];

const adminNav = [
  { label: 'Dashboard', path: '/', icon: icons.home },
  { label: 'Placements', path: '/placement', icon: icons.placement },
  { label: 'Complaints', path: '/complaints', icon: icons.complaints },
  { label: 'Certificates', path: '/certificates', icon: icons.certificate },
  { label: 'Leave Requests', path: '/leave', icon: icons.leave },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = user?.role === 'STUDENT' ? studentNav : user?.role === 'FACULTY' ? facultyNav : adminNav;

  const roleColor = user?.role === 'STUDENT' ? '#6366f1' : user?.role === 'FACULTY' ? '#0ea5e9' : '#f59e0b';
  const roleBg = user?.role === 'STUDENT' ? '#eef2ff' : user?.role === 'FACULTY' ? '#e0f2fe' : '#fef3c7';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 64, background: '#1e1b4b', color: '#fff',
        transition: 'width 0.3s', flexShrink: 0, display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowX: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #312e81', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#6366f1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🎓</div>
          {sidebarOpen && <div><div style={{ fontWeight: 700, fontSize: 15 }}>SAMS</div><div style={{ fontSize: 10, color: '#a5b4fc' }}>Academic System</div></div>}
        </div>

        {/* User info */}
        {sidebarOpen && (
          <div style={{ padding: '16px', borderBottom: '1px solid #312e81' }}>
            <div style={{ background: '#312e81', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ display: 'inline-block', marginTop: 4, background: roleColor, color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{user?.role}</div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', marginBottom: 2, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: active ? '#6366f1' : 'transparent', color: active ? '#fff' : '#c7d2fe',
                  textAlign: 'left', fontSize: 14, fontWeight: active ? 600 : 400,
                  transition: 'all 0.15s'
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#312e81'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #312e81' }}>
          <button onClick={logout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'transparent', color: '#f87171', fontSize: 14, fontWeight: 500
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icons.logout}</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: sidebarOpen ? 240 : 64, flex: 1, transition: 'margin-left 0.3s', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{
          background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 24px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 20, color: '#64748b', padding: '4px 8px', borderRadius: 6 }}>
            {sidebarOpen ? icons.close : icons.menu}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ background: roleBg, color: roleColor, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
              {user?.role}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 34, height: 34, background: roleColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
                {user?.name?.charAt(0)}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
