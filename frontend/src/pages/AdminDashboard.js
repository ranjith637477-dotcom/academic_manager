import React from 'react';
import Layout from '../components/layout/Layout';
import { Card } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const deptStats = [
  { dept:'CSE', students:180, faculty:12 },
  { dept:'ECE', students:150, faculty:10 },
  { dept:'MECH', students:120, faculty:9 },
  { dept:'CIVIL', students:100, faculty:8 },
];

const monthlyData = [
  { month:'Jan', placements:12 }, { month:'Feb', placements:18 },
  { month:'Mar', placements:25 }, { month:'Apr', placements:20 },
  { month:'May', placements:30 }, { month:'Jun', placements:28 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const stats = [
    { icon:'👨‍🎓', label:'Total Students', value:'550', color:'#6366f1' },
    { icon:'👨‍🏫', label:'Total Faculty', value:'39', color:'#0ea5e9' },
    { icon:'🏢', label:'Departments', value:'4', color:'#10b981' },
    { icon:'💼', label:'Placed This Year', value:'133', color:'#f59e0b' },
    { icon:'📋', label:'Pending Requests', value:'14', color:'#ef4444' },
    { icon:'📢', label:'Open Complaints', value:'5', color:'#8b5cf6' },
  ];

  return (
    <Layout>
      <div style={{ maxWidth:1200 }}>
        <div style={{ background:'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius:16, padding:'24px 28px', marginBottom:24, color:'#fff' }}>
          <h2 style={{ fontSize:20, fontWeight:700 }}>Admin Control Panel</h2>
          <p style={{ opacity:0.85, fontSize:14, marginTop:4 }}>System-wide overview and management</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:16, marginBottom:24 }}>
          {stats.map(s => (
            <Card key={s.label} style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:46, height:46, background:s.color+'20', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{s.icon}</div>
              <div><div style={{ fontSize:22, fontWeight:700, color:'#1e1b4b' }}>{s.value}</div><div style={{ fontSize:11, color:'#64748b' }}>{s.label}</div></div>
            </Card>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:16 }}>🏢 Department Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={deptStats}>
                <XAxis dataKey="dept" tick={{ fontSize:12 }} />
                <YAxis tick={{ fontSize:12 }} />
                <Tooltip />
                <Bar dataKey="students" fill="#6366f1" radius={[4,4,0,0]} name="Students" />
                <Bar dataKey="faculty" fill="#0ea5e9" radius={[4,4,0,0]} name="Faculty" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:16 }}>💼 Monthly Placements</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize:12 }} />
                <YAxis tick={{ fontSize:12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="placements" stroke="#f59e0b" strokeWidth={2} dot={{ r:4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:16 }}>⚙️ Quick Management</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:12 }}>
            {[
              { icon:'💼', label:'Manage Opportunities', path:'/placement', color:'#f59e0b' },
              { icon:'📢', label:'Review Complaints', path:'/complaints', color:'#ef4444' },
              { icon:'🎓', label:'Certificate Requests', path:'/certificates', color:'#10b981' },
              { icon:'📋', label:'Leave Approvals', path:'/leave', color:'#6366f1' },
            ].map(a => (
              <button key={a.path} onClick={() => navigate(a.path)}
                style={{ padding:'16px', background:`${a.color}10`, border:`1.5px solid ${a.color}30`, borderRadius:12, cursor:'pointer', textAlign:'center' }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{a.icon}</div>
                <div style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{a.label}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
