import React from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Card } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const classData = [
  { subject:'DSA', present:38, absent:7 },
  { subject:'Web Tech', present:40, absent:5 },
  { subject:'DBMS', present:35, absent:10 },
];

const pendingLeaves = [
  { id:1, name:'Arjun Patel', type:'OD', from:'2025-06-20', reason:'Hackathon at VIT', status:'PENDING' },
  { id:2, name:'Divya Krishnan', type:'LEAVE', from:'2025-06-22', reason:'Medical appointment', status:'PENDING' },
];

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon:'👨‍🎓', label:'Total Students', value:'45', color:'#6366f1' },
    { icon:'📋', label:'Pending Leaves', value:'2', color:'#f59e0b' },
    { icon:'📖', label:'Notes Uploaded', value:'28', color:'#0ea5e9' },
    { icon:'⚠️', label:'Low Attendance', value:'3', color:'#ef4444' },
  ];

  return (
    <Layout>
      <div style={{ maxWidth:1100 }}>
        <div style={{ background:'linear-gradient(135deg,#0ea5e9,#2563eb)', borderRadius:16, padding:'24px 28px', marginBottom:24, color:'#fff' }}>
          <h2 style={{ fontSize:20, fontWeight:700 }}>Faculty Dashboard — {user?.name}</h2>
          <p style={{ opacity:0.85, fontSize:14, marginTop:4 }}>Manage your classes, attendance and student records</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:24 }}>
          {stats.map(s => (
            <Card key={s.label} style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:48, height:48, background:s.color+'20', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{s.icon}</div>
              <div><div style={{ fontSize:24, fontWeight:700, color:'#1e1b4b' }}>{s.value}</div><div style={{ fontSize:12, color:'#64748b' }}>{s.label}</div></div>
            </Card>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:16 }}>📊 Class Attendance Today</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={classData}>
                <XAxis dataKey="subject" tick={{ fontSize:12 }} />
                <YAxis tick={{ fontSize:12 }} />
                <Tooltip />
                <Bar dataKey="present" fill="#10b981" radius={[4,4,0,0]} name="Present" />
                <Bar dataKey="absent" fill="#fca5a5" radius={[4,4,0,0]} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:16 }}>📋 Pending Leave Approvals</h3>
            {pendingLeaves.map(l => (
              <div key={l.id} style={{ padding:'12px 0', borderBottom:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{l.name}</div>
                  <div style={{ fontSize:12, color:'#64748b' }}>{l.type} · {l.from} · {l.reason}</div>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button style={{ padding:'5px 12px', background:'#d1fae5', color:'#065f46', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600 }}>✓ Approve</button>
                  <button style={{ padding:'5px 12px', background:'#fee2e2', color:'#991b1b', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600 }}>✕ Reject</button>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/leave')} style={{ marginTop:12, color:'#6366f1', background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:600 }}>View all →</button>
          </Card>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {[
            { icon:'✅', label:'Mark Attendance', path:'/attendance', color:'#10b981' },
            { icon:'📊', label:'Upload Marks', path:'/marks', color:'#6366f1' },
            { icon:'📖', label:'Upload Notes', path:'/notes', color:'#0ea5e9' },
          ].map(a => (
            <button key={a.path} onClick={() => navigate(a.path)}
              style={{ padding:'20px', background:'#fff', border:`2px solid ${a.color}30`, borderRadius:12, cursor:'pointer', textAlign:'center' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{a.icon}</div>
              <div style={{ fontSize:14, fontWeight:600, color:'#374151' }}>{a.label}</div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
