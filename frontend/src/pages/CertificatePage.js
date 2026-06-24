import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { certificateService } from '../services/api';
import { Card, PageTitle, Badge, Btn, formatDate } from '../utils/helpers';

const certTypes = [
  { type:'BONAFIDE', label:'Bonafide Certificate', icon:'🎓', desc:'For bank, scholarship, visa, and other official purposes.' },
  { type:'NO_DUE', label:'No Due Certificate', icon:'✅', desc:'Certifying no pending dues in library, hostel, or fees.' },
  { type:'TRANSFER', label:'Transfer Certificate', icon:'📄', desc:'Required when transferring to another institution.' },
  { type:'OTHER', label:'Other Certificate', icon:'📋', desc:'Custom certificates for any other academic purpose.' },
];

const mockCerts = [
  { id:1, type:'BONAFIDE', reason:'Required for bank account opening', status:'APPROVED', remarks:'Certificate issued. Collect from office.', createdAt:'2025-06-10', updatedAt:'2025-06-12' },
  { id:2, type:'NO_DUE', reason:'End of semester clearance', status:'PROCESSING', remarks:'Being verified with departments', createdAt:'2025-06-15', updatedAt:'2025-06-16' },
];

const mockAllCerts = [
  ...mockCerts,
  { id:3, student:{ name:'Divya Krishnan' }, type:'BONAFIDE', reason:'Scholarship application', status:'PENDING', createdAt:'2025-06-18' },
  { id:4, student:{ name:'Ravi Shankar' }, type:'TRANSFER', reason:'Transferring to VIT', status:'PENDING', createdAt:'2025-06-17' },
];

export default function CertificatePage() {
  const { user } = useAuth();
  const isStudent = user?.role === 'STUDENT';
  const isAdmin = user?.role === 'ADMIN';
  const [certs, setCerts] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetcher = isStudent ? certificateService.getMy : certificateService.getAll;
    fetcher().then(r => setCerts(r.data?.data || [])).catch(() => setCerts(isStudent ? mockCerts : mockAllCerts));
  }, [isStudent]);

  const handleApply = async (type) => {
    try {
      await certificateService.apply({ type, reason });
    } catch {}
    setCerts([{ id:Date.now(), type, reason, status:'PENDING', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() }, ...certs]);
    setMsg(`${certTypes.find(c=>c.type===type)?.label} application submitted!`);
    setShowForm(null); setReason('');
  };

  const handleUpdate = async (id, status, remarks) => {
    try { await certificateService.updateStatus(id, { status, remarks }); } catch {}
    setCerts(c => c.map(x => x.id===id ? {...x, status, remarks} : x));
  };

  const displayCerts = certs.length ? certs : (isStudent ? mockCerts : mockAllCerts);

  return (
    <Layout>
      <PageTitle title="Certificate Management" subtitle={isStudent ? "Apply for academic certificates" : "Manage student certificate requests"} />
      {msg && <div style={{ background:'#d1fae5', color:'#065f46', padding:'10px 16px', borderRadius:8, marginBottom:16 }}>{msg}</div>}

      {isStudent && (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14, marginBottom:28 }}>
            {certTypes.map(c => (
              <button key={c.type} onClick={() => setShowForm(c.type)}
                style={{ padding:'20px 16px', background:showForm===c.type?'#4f46e5':'#fff', border:`2px solid ${showForm===c.type?'#4f46e5':'#e5e7eb'}`, borderRadius:12, cursor:'pointer', textAlign:'center', transition:'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#6366f1'; e.currentTarget.style.background='#f5f3ff'; }}
                onMouseLeave={e => { if(showForm!==c.type){ e.currentTarget.style.borderColor='#e5e7eb'; e.currentTarget.style.background='#fff'; }}}>
                <div style={{ fontSize:28, marginBottom:8 }}>{c.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:showForm===c.type?'#fff':'#1e1b4b', marginBottom:4 }}>{c.label}</div>
                <div style={{ fontSize:11, color:showForm===c.type?'#c7d2fe':'#64748b' }}>{c.desc}</div>
              </button>
            ))}
          </div>

          {showForm && (
            <Card style={{ marginBottom:24, borderLeft:'4px solid #6366f1' }}>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Apply for {certTypes.find(c=>c.type===showForm)?.label}</h3>
              <p style={{ fontSize:13, color:'#64748b', marginBottom:16 }}>{certTypes.find(c=>c.type===showForm)?.desc}</p>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Reason / Purpose</label>
              <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                placeholder="Describe why you need this certificate..."
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, resize:'vertical', marginBottom:16 }} />
              <div style={{ display:'flex', gap:10 }}>
                <Btn onClick={() => handleApply(showForm)}>Submit Application</Btn>
                <Btn variant="outline" onClick={() => setShowForm(null)}>Cancel</Btn>
              </div>
            </Card>
          )}

          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>My Certificate Requests</h3>
            {displayCerts.length === 0 ? <p style={{ color:'#64748b' }}>No applications yet.</p> : (
              displayCerts.map(c => (
                <div key={c.id} style={{ padding:'16px', marginBottom:10, background:'#f8fafc', borderRadius:10, border:'1px solid #e2e8f0' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{certTypes.find(x=>x.type===c.type)?.icon} {certTypes.find(x=>x.type===c.type)?.label || c.type}</div>
                    <Badge status={c.status} />
                  </div>
                  <div style={{ fontSize:13, color:'#64748b' }}>Reason: {c.reason}</div>
                  {c.remarks && <div style={{ fontSize:12, color:'#6366f1', marginTop:6, background:'#eef2ff', padding:'6px 10px', borderRadius:6 }}>📝 {c.remarks}</div>}
                  <div style={{ fontSize:11, color:'#9ca3af', marginTop:6 }}>Applied: {formatDate(c.createdAt)} · Updated: {formatDate(c.updatedAt)}</div>
                </div>
              ))
            )}
          </Card>
        </>
      )}

      {!isStudent && (
        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>All Certificate Requests</h3>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
            <thead>
              <tr style={{ background:'#f8fafc' }}>
                {['Student','Type','Reason','Status','Actions'].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:12, fontWeight:600, color:'#64748b', borderBottom:'1px solid #e2e8f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayCerts.map(c => (
                <tr key={c.id} style={{ borderBottom:'1px solid #f1f5f9' }}>
                  <td style={{ padding:'12px 14px', fontWeight:500 }}>{c.student?.name || user?.name}</td>
                  <td style={{ padding:'12px 14px' }}>{certTypes.find(x=>x.type===c.type)?.label || c.type}</td>
                  <td style={{ padding:'12px 14px', color:'#64748b', maxWidth:200, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.reason}</td>
                  <td style={{ padding:'12px 14px' }}><Badge status={c.status} /></td>
                  <td style={{ padding:'12px 14px' }}>
                    {c.status === 'PENDING' && (
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => handleUpdate(c.id,'APPROVED','Certificate approved. Ready for collection.')} style={{ padding:'5px 10px', background:'#d1fae5', color:'#065f46', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600 }}>✓ Approve</button>
                        <button onClick={() => handleUpdate(c.id,'REJECTED','Request rejected.')} style={{ padding:'5px 10px', background:'#fee2e2', color:'#991b1b', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600 }}>✕ Reject</button>
                      </div>
                    )}
                    {c.status !== 'PENDING' && <span style={{ color:'#9ca3af', fontSize:12 }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </Layout>
  );
}
