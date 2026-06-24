import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { notesService } from '../services/api';
import { Card, PageTitle, Btn, formatDate } from '../utils/helpers';

const mockNotes = [
  { id:1, title:'DSA - Lesson 12: Graph Algorithms', subject:{ code:'CS301', name:'Data Structures' }, faculty:{ name:'Dr. Priya Sharma' }, description:'This lesson covers BFS, DFS, Dijkstra and Bellman-Ford algorithms with their time complexities.', aiSummary:'Key concepts: Graph traversal using BFS (O(V+E)) and DFS, shortest path via Dijkstra (greedy, O(V²)) and Bellman-Ford (handles negatives, O(VE)). Focus on edge cases and implementation.', lessonNumber:12, createdAt:'2025-06-17' },
  { id:2, title:'Web Tech - Lesson 8: React Hooks', subject:{ code:'CS302', name:'Web Technologies' }, faculty:{ name:'Prof. Ramesh Kumar' }, description:'Deep dive into useState, useEffect, useContext and custom hooks in React.', aiSummary:'Core hooks: useState manages component state, useEffect handles side effects (lifecycle), useContext shares data. Custom hooks encapsulate reusable logic. Best practice: keep hooks pure.', lessonNumber:8, createdAt:'2025-06-16' },
  { id:3, title:'DBMS - Lesson 10: Transactions & ACID', subject:{ code:'CS303', name:'DBMS' }, faculty:{ name:'Dr. Meena Iyer' }, description:'Transaction management, ACID properties, serializability and lock-based protocols.', aiSummary:'ACID: Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent safe), Durability (persists). Concurrency control via 2-Phase Locking. Deadlock detection and prevention.', lessonNumber:10, createdAt:'2025-06-15' },
];

export default function NotesPage() {
  const { user } = useAuth();
  const isFaculty = user?.role === 'FACULTY';
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subjectId:'', title:'', description:'', lessonNumber:'' });
  const [expandedSummary, setExpandedSummary] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    notesService.getAll().then(r => setNotes(r.data?.data || [])).catch(() => setNotes(mockNotes));
  }, []);

  const handleUpload = async () => {
    try {
      await notesService.upload(form);
      setMsg('Notes uploaded with AI summary!');
    } catch { setMsg('Notes uploaded (demo mode)!'); }
    const newNote = { id:Date.now(), title:form.title, subject:{ code:'CS301', name:'DSA' }, faculty:{ name:user?.name }, description:form.description, aiSummary:'AI summary generated: ' + (form.description?.substring(0,120)||'') + '...', lessonNumber:form.lessonNumber, createdAt:new Date().toISOString() };
    setNotes([newNote, ...notes]);
    setShowForm(false);
  };

  const displayNotes = notes.length ? notes : mockNotes;

  return (
    <Layout>
      <PageTitle title="Faculty Notes" subtitle="Access class notes with AI-generated summaries" />
      {msg && <div style={{ background:'#d1fae5', color:'#065f46', padding:'10px 16px', borderRadius:8, marginBottom:16 }}>{msg}</div>}

      {isFaculty && (
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
          <Btn onClick={() => setShowForm(!showForm)}>+ Upload Notes</Btn>
        </div>
      )}

      {showForm && (
        <Card style={{ marginBottom:20, borderLeft:'4px solid #0ea5e9' }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Upload Class Notes</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Subject</label>
              <select value={form.subjectId} onChange={e => setForm({...form, subjectId:e.target.value})}
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, background:'#fff' }}>
                <option value="">Select subject</option>
                <option value="1">CS301 - Data Structures</option>
                <option value="2">CS302 - Web Technologies</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Lesson Number</label>
              <input type="number" value={form.lessonNumber} onChange={e => setForm({...form, lessonNumber:e.target.value})}
                placeholder="e.g. 13"
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Title</label>
              <input value={form.title} onChange={e => setForm({...form, title:e.target.value})}
                placeholder="e.g. Graph Algorithms - BFS & DFS"
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Content / Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description:e.target.value})} rows={5}
                placeholder="Enter the notes content. AI will auto-generate a summary..."
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, resize:'vertical' }} />
            </div>
          </div>
          <div style={{ marginTop:12, background:'#eef2ff', padding:'10px 14px', borderRadius:8, fontSize:13, color:'#4f46e5' }}>
            🤖 AI will automatically generate a concise summary of your notes.
          </div>
          <div style={{ display:'flex', gap:10, marginTop:16 }}>
            <Btn onClick={handleUpload}>Upload & Generate Summary</Btn>
            <Btn variant="outline" onClick={() => setShowForm(false)}>Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:16 }}>
        {displayNotes.map(n => (
          <Card key={n.id} style={{ display:'flex', flexDirection:'column', gap:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
              <span style={{ background:'#eef2ff', color:'#4f46e5', padding:'3px 10px', borderRadius:6, fontSize:12, fontWeight:700 }}>{n.subject?.code}</span>
              <span style={{ fontSize:11, color:'#9ca3af' }}>{formatDate(n.createdAt)}</span>
            </div>
            <h4 style={{ fontSize:14, fontWeight:700, color:'#1e1b4b', marginBottom:4 }}>{n.title}</h4>
            <p style={{ fontSize:12, color:'#64748b', marginBottom:10 }}>By {n.faculty?.name} · Lesson {n.lessonNumber}</p>
            <p style={{ fontSize:13, color:'#374151', marginBottom:12, lineHeight:1.5 }}>{n.description?.substring(0,100)}...</p>

            {/* AI Summary */}
            <div style={{ background:'linear-gradient(135deg,#eef2ff,#f0fdf4)', border:'1px solid #c7d2fe', borderRadius:10, padding:'12px 14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                <span style={{ fontSize:12, fontWeight:700, color:'#6366f1' }}>🤖 AI Summary</span>
                <button onClick={() => setExpandedSummary(p => ({...p,[n.id]:!p[n.id]}))}
                  style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, color:'#6366f1', fontWeight:600 }}>
                  {expandedSummary[n.id] ? 'Less ▲' : 'More ▼'}
                </button>
              </div>
              <p style={{ fontSize:12, color:'#374151', lineHeight:1.6 }}>
                {expandedSummary[n.id] ? n.aiSummary : (n.aiSummary?.substring(0,120) + '...')}
              </p>
            </div>

            <div style={{ display:'flex', gap:8, marginTop:12 }}>
              <button style={{ flex:1, padding:'7px', background:'#eef2ff', color:'#4f46e5', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600 }}>📥 Download</button>
              <button style={{ flex:1, padding:'7px', background:'#f0fdf4', color:'#16a34a', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600 }}>👁 View Full</button>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
