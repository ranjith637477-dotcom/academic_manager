import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { attendanceService, marksService, notificationService } from '../services/api';
import { Card } from '../utils/helpers';
import Chatbot from '../components/chatbot/Chatbot';

const StatCard = ({ icon, label, value, color, sub }) => (
  <div style={{ background:'#fff', borderRadius:14, padding:20, boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:16 }}>
    <div style={{ width:52, height:52, background:color+'20', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{icon}</div>
    <div>
      <div style={{ fontSize:26, fontWeight:700, color:'#1e1b4b' }}>{value}</div>
      <div style={{ fontSize:13, color:'#64748b' }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:color, fontWeight:600, marginTop:2 }}>{sub}</div>}
    </div>
  </div>
);

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Promise.all([
      attendanceService.getMyAttendance().catch(() => ({ data: { data: [] } })),
      marksService.getMyMarks().catch(() => ({ data: { data: [] } })),
      notificationService.getMy().catch(() => ({ data: { data: [] } })),
    ]).then(([a, m, n]) => {
      setAttendance(a.data?.data || []);
      setMarks(m.data?.data || []);
      setNotifications((n.data?.data || []).slice(0, 5));
    });
  }, []);

  // Mock stats if API not ready
  const attendancePct = attendance.length ? 
    Math.round((attendance.filter(a => a.status === 'PRESENT').length / attendance.length) * 100) : 82;
  
  const marksData = marks.length ? marks.map(m => ({
    name: m.subject?.code || 'Subject',
    total: parseFloat(m.total) || 0
  })) : [
    { name: 'CS301', total: 197 },
    { name: 'CS302', total: 180 },
    { name: 'CS303', total: 165 },
    { name: 'CS304', total: 210 },
  ];

  const atPieData = [
    { name: 'Present', value: attendancePct, color: '#10b981' },
    { name: 'Absent', value: 100 - attendancePct, color: '#fee2e2' },
  ];

  const quickActions = [
    { label: 'Apply Leave', icon: '📋', path: '/leave', color: '#6366f1' },
    { label: 'View Marks', icon: '📊', path: '/marks', color: '#0ea5e9' },
    { label: 'Attendance', icon: '✅', path: '/attendance', color: '#10b981' },
    { label: 'Placements', icon: '💼', path: '/placement', color: '#f59e0b' },
    { label: 'File Complaint', icon: '📢', path: '/complaints', color: '#ef4444' },
    { label: 'Team Finder', icon: '👥', path: '/team-finder', color: '#8b5cf6' },
  ];

  const mockNotifications = [
    { id:1, title:'Attendance Alert', message:'Your attendance in DBMS is below 75%.', type:'WARNING', isRead:false, createdAt:'2025-06-15' },
    { id:2, title:'New Notes Available', message:'Prof. Ramesh uploaded notes for Web Tech - Lesson 5.', type:'INFO', isRead:false, createdAt:'2025-06-14' },
    { id:3, title:'Leave Approved', message:'Your leave for June 15 has been approved.', type:'SUCCESS', isRead:true, createdAt:'2025-06-13' },
    { id:4, title:'TCS Placement Drive', message:'TCS campus placement announced. Check Placements.', type:'INFO', isRead:true, createdAt:'2025-06-12' },
  ];

  const displayNotifications = notifications.length ? notifications : mockNotifications;
  const notifIcons = { WARNING:'⚠️', INFO:'ℹ️', SUCCESS:'✅', ALERT:'🚨' };

  return (
    <Layout>
      <div style={{ maxWidth:1200 }}>
        {/* Welcome */}
        <div style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius:16, padding:'24px 28px', marginBottom:24, color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
            <p style={{ opacity:0.85, fontSize:14 }}>Here's your academic overview for today</p>
          </div>
          <div style={{ textAlign:'right', opacity:0.9 }}>
            <div style={{ fontSize:28, fontWeight:700 }}>{new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>
            <div style={{ fontSize:13 }}>{new Date().toLocaleDateString('en-IN',{weekday:'long'})}</div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:24 }}>
          <StatCard icon="✅" label="Attendance" value={`${attendancePct}%`} color="#10b981" sub={attendancePct >= 75 ? '✓ Good standing' : '⚠ Below 75%'} />
          <StatCard icon="📊" label="Avg Marks" value="172/250" color="#6366f1" sub="Sem 5 average" />
          <StatCard icon="📋" label="Pending Leaves" value="1" color="#f59e0b" sub="Awaiting approval" />
          <StatCard icon="🔔" label="Notifications" value={displayNotifications.filter(n=>!n.isRead).length} color="#ef4444" sub="Unread" />
        </div>

        {/* Charts + Notifications row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 320px', gap:20, marginBottom:24 }}>
          {/* Marks bar chart */}
          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:16 }}>📊 Subject-wise Marks</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={marksData}>
                <XAxis dataKey="name" tick={{ fontSize:12 }} />
                <YAxis tick={{ fontSize:12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#6366f1" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Attendance Pie */}
          <Card style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:8, alignSelf:'flex-start' }}>✅ Attendance Overview</h3>
            <PieChart width={180} height={180}>
              <Pie data={atPieData} cx={90} cy={90} innerRadius={55} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                {atPieData.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
            <div style={{ textAlign:'center', marginTop:-16 }}>
              <div style={{ fontSize:28, fontWeight:800, color:'#1e1b4b' }}>{attendancePct}%</div>
              <div style={{ fontSize:12, color:'#64748b' }}>Overall Attendance</div>
            </div>
            <div style={{ display:'flex', gap:16, marginTop:12, fontSize:12 }}>
              <span style={{ color:'#10b981', fontWeight:600 }}>● Present</span>
              <span style={{ color:'#ef4444', fontWeight:600 }}>● Absent</span>
            </div>
          </Card>

          {/* Notifications */}
          <Card style={{ padding:0, overflow:'hidden' }}>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b' }}>🔔 Notifications</h3>
              <span style={{ background:'#fee2e2', color:'#ef4444', fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:10 }}>{displayNotifications.filter(n=>!n.isRead).length} new</span>
            </div>
            <div style={{ maxHeight:240, overflowY:'auto' }}>
              {displayNotifications.map(n => (
                <div key={n.id} style={{ padding:'12px 20px', borderBottom:'1px solid #f8fafc', background:n.isRead?'#fff':'#fafbff', display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ fontSize:16, marginTop:1 }}>{notifIcons[n.type]}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#374151', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{n.title}</div>
                    <div style={{ fontSize:11, color:'#6b7280', marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{n.message}</div>
                  </div>
                  {!n.isRead && <div style={{ width:7, height:7, background:'#6366f1', borderRadius:'50%', flexShrink:0, marginTop:4 }} />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:16 }}>⚡ Quick Actions</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12 }}>
            {quickActions.map(a => (
              <button key={a.path} onClick={() => navigate(a.path)}
                style={{ padding:'16px 12px', background:`${a.color}10`, border:`1.5px solid ${a.color}30`, borderRadius:12, cursor:'pointer', textAlign:'center', transition:'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background=a.color; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background=`${a.color}10`; e.currentTarget.style.color=''; }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{a.icon}</div>
                <div style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{a.label}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
      <Chatbot />
    </Layout>
  );
}
