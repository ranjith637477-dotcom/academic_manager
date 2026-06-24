import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { leaveService } from '../services/api';
import { Card, PageTitle, Badge, Btn, formatDate } from '../utils/helpers';

const mockLeaves = [
  { id:1, type:'OD', fromDate:'2025-06-20', toDate:'2025-06-20', reason:'Hackathon at VIT', eventName:'HackVIT 2025', finalStatus:'APPROVED', inchargeStatus:'APPROVED', hodStatus:'APPROVED', coordinatorStatus:'APPROVED', createdAt:'2025-06-15' },
  { id:2, type:'LEAVE', fromDate:'2025-06-25', toDate:'2025-06-26', reason:'Medical appointment', finalStatus:'PENDING', inchargeStatus:'PENDING', hodStatus:'PENDING', coordinatorStatus:'PENDING', createdAt:'2025-06-18' },
  { id:3, type:'OD', fromDate:'2025-07-05', toDate:'2025-07-05', reason:'State level competition', eventName:'TechFest IIT', finalStatus:'REJECTED', inchargeStatus:'REJECTED', hodStatus:'PENDING', coordinatorStatus:'PENDING', createdAt:'2025-06-17' },
];

const mockPending = [
  { id:4, student:{ name:'Ravi Shankar' }, type:'LEAVE', fromDate:'2025-06-22', toDate:'2025-06-22', reason:'Family function', finalStatus:'PENDING' },
  { id:5, student:{ name:'Priya Iyer' }, type:'OD', fromDate:'2025-06-28', toDate:'2025-06-28', reason:'Workshop at Anna University', eventName:'ML Workshop', finalStatus:'PENDING' },
];

export default function LeavePage() {
  const { user } = useAuth();
  const isStudent = user?.role === 'STUDENT';
  const [applications, setApplications] = useState([]);
  const [pending, setPending] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type:'LEAVE', fromDate:'', toDate:'', reason:'', eventName:'' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (isStudent) {
      leaveService.getMyApplications().then(r => setApplications(r.data?.data || [])).catch(() => setApplications(mockLeaves));
    } else {
      leaveService.getPending().then(r => setPending(r.data?.data || [])).catch(() => setPending(mockPending));
    }
  }, [isStudent]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await leaveService.apply(form);
      setMsg('Application submitted successfully!');
      setShowForm(false);
      setForm({ type:'LEAVE', fromDate:'', toDate:'', reason:'', eventName:'' });
      leaveService.getMyApplications().then(r => setApplications(r.data?.data || [])).catch(() => {});
    } catch (e) {
      setMsg(e.response?.data?.message || 'Submitted (demo mode)');
      setShowForm(false);
    }
    setSubmitting(false);
  };

  const handleApprove = async (id, level, status) => {
    try {
      await leaveService.updateStatus(id, { level, status, remark: status === 'APPROVED' ? 'Approved' : 'Rejected' });
      setPending(p => p.filter(x => x.id !== id));
    } catch { setPending(p => p.filter(x => x.id !== id)); }
  };

  const displayList = applications.length ? applications : mockLeaves;
  const displayPending = pending.length ? pending : mockPending;

  return (
    <Layout>
      <PageTitle title="Leave & On-Duty Management" subtitle="Apply for leaves and track approval status" />

      {msg && <div style={{ background:'#d1fae5', border:'1px solid #6ee7b7', color:'#065f46', padding:'10px 16px', borderRadius:8, marginBottom:16, fontSize:14 }}>{msg}</div>}

      {isStudent ? (
        <>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
            <Btn onClick={() => setShowForm(!showForm)}>+ Apply for Leave / OD</Btn>
          </div>

          {showForm && (
            <Card style={{ marginBottom:20, borderLeft:'4px solid #6366f1' }}>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>New Application</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type:e.target.value})}
                    style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, background:'#fff' }}>
                    <option value="LEAVE">Leave</option>
                    <option value="OD">On-Duty (OD)</option>
                  </select>
                </div>
                {form.type === 'OD' && (
                  <div>
                    <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Event Name</label>
                    <input value={form.eventName} onChange={e => setForm({...form, eventName:e.target.value})}
                      placeholder="e.g. HackVIT 2025"
                      style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
                  </div>
                )}
                <div>
                  <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>From Date</label>
                  <input type="date" value={form.fromDate} onChange={e => setForm({...form, fromDate:e.target.value})}
                    style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
                </div>
                <div>
                  <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>To Date</label>
                  <input type="date" value={form.toDate} onChange={e => setForm({...form, toDate:e.target.value})}
                    style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
                </div>
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Reason</label>
                  <textarea value={form.reason} onChange={e => setForm({...form, reason:e.target.value})} rows={3}
                    placeholder="Describe your reason..."
                    style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, resize:'vertical' }} />
                </div>
              </div>
              {form.type === 'OD' && <p style={{ fontSize:12, color:'#f59e0b', marginTop:8 }}>⚠️ OD must be applied at least 1 day before the event.</p>}
              <div style={{ display:'flex', gap:10, marginTop:16 }}>
                <Btn onClick={handleSubmit} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Application'}</Btn>
                <Btn variant="outline" onClick={() => setShowForm(false)}>Cancel</Btn>
              </div>
            </Card>
          )}

          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>My Applications</h3>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Type','From','To','Reason','Class Incharge','HOD','Coordinator','Final Status'].map(h => (
                    <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:12, fontWeight:600, color:'#64748b', borderBottom:'1px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayList.map(a => (
                  <tr key={a.id} style={{ borderBottom:'1px solid #f1f5f9' }}>
                    <td style={{ padding:'12px' }}><span style={{ background:a.type==='OD'?'#eef2ff':'#fef3c7', color:a.type==='OD'?'#4f46e5':'#92400e', padding:'3px 8px', borderRadius:6, fontSize:12, fontWeight:600 }}>{a.type}</span></td>
                    <td style={{ padding:'12px', color:'#374151' }}>{formatDate(a.fromDate)}</td>
                    <td style={{ padding:'12px', color:'#374151' }}>{formatDate(a.toDate)}</td>
                    <td style={{ padding:'12px', color:'#64748b', maxWidth:160, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.reason}</td>
                    <td style={{ padding:'12px' }}><Badge status={a.inchargeStatus} /></td>
                    <td style={{ padding:'12px' }}><Badge status={a.hodStatus} /></td>
                    <td style={{ padding:'12px' }}><Badge status={a.coordinatorStatus} /></td>
                    <td style={{ padding:'12px' }}><Badge status={a.finalStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      ) : (
        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Pending Approvals</h3>
          {displayPending.length === 0 ? <p style={{ color:'#64748b' }}>No pending requests.</p> : (
            displayPending.map(a => (
              <div key={a.id} style={{ padding:'16px 0', borderBottom:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{a.student?.name}</div>
                  <div style={{ fontSize:13, color:'#64748b', marginTop:2 }}>
                    <span style={{ background:a.type==='OD'?'#eef2ff':'#fef3c7', color:a.type==='OD'?'#4f46e5':'#92400e', padding:'2px 8px', borderRadius:6, fontSize:11, fontWeight:600, marginRight:8 }}>{a.type}</span>
                    {formatDate(a.fromDate)} · {a.reason}
                  </div>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={() => handleApprove(a.id, 'incharge', 'APPROVED')} style={{ padding:'6px 14px', background:'#d1fae5', color:'#065f46', border:'none', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:13 }}>✓ Approve</button>
                  <button onClick={() => handleApprove(a.id, 'incharge', 'REJECTED')} style={{ padding:'6px 14px', background:'#fee2e2', color:'#991b1b', border:'none', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:13 }}>✕ Reject</button>
                </div>
              </div>
            ))
          )}
        </Card>
      )}
    </Layout>
  );
}
