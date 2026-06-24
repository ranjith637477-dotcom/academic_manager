import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { complaintService } from '../services/api';
import { Card, PageTitle, Badge, Btn, formatDate } from '../utils/helpers';

const mockComplaints = [
  { id:1, category:'ACADEMIC', subject:'Teaching quality issue', description:'Faculty is not explaining concepts clearly in ML class.', status:'IN_REVIEW', isAnonymous:false, createdAt:'2025-06-10' },
  { id:2, category:'MANAGEMENT', subject:'Fan not working in Lab', description:'The fan in Computer Lab 2 has not been working for 2 weeks.', status:'RESOLVED', isAnonymous:false, resolution:'Fan repaired on June 12.', createdAt:'2025-06-05' },
];

export default function ComplaintsPage() {
  const { user } = useAuth();
  const isStudent = user?.role === 'STUDENT';
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category:'ACADEMIC', subject:'', description:'', isAnonymous:false });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetch = isStudent ? complaintService.getMy : complaintService.getAll;
    fetch().then(r => setComplaints(r.data?.data || [])).catch(() => setComplaints(mockComplaints));
  }, [isStudent]);

  const handleSubmit = async () => {
    try {
      await complaintService.submit(form);
      setMsg('Complaint submitted!');
    } catch { setMsg('Complaint submitted (demo mode)!'); }
    setShowForm(false);
    setComplaints([{ id: Date.now(), ...form, status:'SUBMITTED', createdAt: new Date().toISOString() }, ...complaints]);
  };

  const displayList = complaints.length ? complaints : mockComplaints;

  return (
    <Layout>
      <PageTitle title="Complaint Management" subtitle="Submit and track academic & management complaints" />
      {msg && <div style={{ background:'#d1fae5', color:'#065f46', padding:'10px 16px', borderRadius:8, marginBottom:16 }}>{msg}</div>}

      {isStudent && (
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
          <Btn onClick={() => setShowForm(!showForm)}>+ File Complaint</Btn>
        </div>
      )}

      {showForm && (
        <Card style={{ marginBottom:20, borderLeft:'4px solid #ef4444' }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>New Complaint</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category:e.target.value})}
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, background:'#fff' }}>
                <option value="ACADEMIC">Academic</option>
                <option value="MANAGEMENT">Management</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Subject</label>
              <input value={form.subject} onChange={e => setForm({...form, subject:e.target.value})}
                placeholder="Brief subject line"
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description:e.target.value})} rows={4}
                placeholder="Describe your complaint in detail..."
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, resize:'vertical' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <input type="checkbox" id="anon" checked={form.isAnonymous} onChange={e => setForm({...form, isAnonymous:e.target.checked})} />
              <label htmlFor="anon" style={{ fontSize:13, fontWeight:600, cursor:'pointer' }}>Submit Anonymously</label>
            </div>
          </div>
          <div style={{ display:'flex', gap:10, marginTop:16 }}>
            <Btn onClick={handleSubmit}>Submit Complaint</Btn>
            <Btn variant="outline" onClick={() => setShowForm(false)}>Cancel</Btn>
          </div>
        </Card>
      )}

      <Card>
        <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>{isStudent ? 'My Complaints' : 'All Complaints'}</h3>
        {displayList.map(c => (
          <div key={c.id} style={{ padding:'16px', marginBottom:12, background:'#f8fafc', borderRadius:10, border:'1px solid #e2e8f0' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div>
                <span style={{ background: c.category==='ACADEMIC'?'#eef2ff':'#fef3c7', color: c.category==='ACADEMIC'?'#4f46e5':'#92400e', padding:'2px 8px', borderRadius:6, fontSize:11, fontWeight:700, marginRight:8 }}>{c.category}</span>
                <span style={{ fontWeight:600, fontSize:14 }}>{c.subject}</span>
                {c.isAnonymous && <span style={{ marginLeft:8, background:'#f3f4f6', color:'#6b7280', padding:'2px 8px', borderRadius:6, fontSize:11 }}>Anonymous</span>}
              </div>
              <Badge status={c.status} />
            </div>
            <p style={{ fontSize:13, color:'#64748b', marginBottom:c.resolution?8:0 }}>{c.description}</p>
            {c.resolution && <div style={{ background:'#d1fae5', color:'#065f46', padding:'8px 12px', borderRadius:6, fontSize:12, marginTop:8 }}>✓ Resolution: {c.resolution}</div>}
            <div style={{ fontSize:11, color:'#9ca3af', marginTop:8 }}>Filed: {formatDate(c.createdAt)}</div>
          </div>
        ))}
      </Card>
    </Layout>
  );
}
