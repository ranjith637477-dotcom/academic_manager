import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/api';
import { Card, PageTitle, Btn, formatDate } from '../utils/helpers';

const mockEvents = [
  { id:1, title:'HackVIT 2025', category:'HACKATHON', description:'24-hour hackathon at VIT Vellore. Build solutions for smart cities.', requiredSkills:'React, Node.js, ML', teamSize:4, eventDate:'2025-07-20', registrationDeadline:'2025-07-10', isOpen:true, creator:{ name:'Arjun Patel' } },
  { id:2, title:'SIH Internal Hackathon', category:'HACKATHON', description:'Internal selection for Smart India Hackathon 2025. Problem statements from govt.', requiredSkills:'Any Tech Stack', teamSize:6, eventDate:'2025-07-05', registrationDeadline:'2025-06-30', isOpen:true, creator:{ name:'Divya Krishnan' } },
  { id:3, title:'ML Research Project', category:'PROJECT', description:'Looking for teammates to build a GAN-based image synthesis model for our research paper.', requiredSkills:'Python, TensorFlow, Research', teamSize:3, eventDate:'2025-08-01', registrationDeadline:'2025-07-15', isOpen:true, creator:{ name:'Ravi Shankar' } },
  { id:4, title:'Web Dev Workshop', category:'WORKSHOP', description:'Organizing a 2-day React + Spring Boot workshop. Need co-organizers and mentors.', requiredSkills:'React, Spring Boot', teamSize:5, eventDate:'2025-07-12', registrationDeadline:'2025-07-08', isOpen:true, creator:{ name:'Arjun Patel' } },
];

const mockProfiles = [
  { id:5, name:'Arjun Patel', roll:'21CS001', skills:'Java, React, Python', interests:'AI, Web Development', cgpa:8.5 },
  { id:6, name:'Divya Krishnan', roll:'21CS002', skills:'Python, ML, Django', interests:'Machine Learning, Data Science', cgpa:9.1 },
  { id:7, name:'Ravi Shankar', roll:'21CS003', skills:'C++, React, Node.js', interests:'Full Stack, Competitive Programming', cgpa:7.8 },
];

const catColors = { HACKATHON:'#f59e0b', COMPETITION:'#ef4444', PROJECT:'#6366f1', WORKSHOP:'#10b981', OTHER:'#8b5cf6' };

export default function TeamFinderPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState('events');
  const [showForm, setShowForm] = useState(false);
  const [skillFilter, setSkillFilter] = useState('');
  const [form, setForm] = useState({ title:'', category:'HACKATHON', description:'', requiredSkills:'', teamSize:4, eventDate:'', registrationDeadline:'' });
  const [applied, setApplied] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    eventService.getAll().then(r => setEvents(r.data?.data || [])).catch(() => setEvents(mockEvents));
  }, []);

  const handleCreate = async () => {
    try { await eventService.create(form); } catch {}
    setEvents([{ id:Date.now(), ...form, isOpen:true, creator:{ name:user?.name } }, ...events]);
    setMsg('Event posted! Others can now apply.'); setShowForm(false);
  };

  const handleApply = (id) => { setApplied(a => ({...a,[id]:true})); setMsg('Application sent!'); setTimeout(()=>setMsg(''),3000); };

  const displayEvents = (events.length ? events : mockEvents);
  const filteredProfiles = skillFilter ? mockProfiles.filter(p => p.skills.toLowerCase().includes(skillFilter.toLowerCase()) || p.interests.toLowerCase().includes(skillFilter.toLowerCase())) : mockProfiles;

  return (
    <Layout>
      <PageTitle title="Team Finder" subtitle="Find teammates for hackathons, projects and competitions" />
      {msg && <div style={{ background:'#d1fae5', color:'#065f46', padding:'10px 16px', borderRadius:8, marginBottom:16 }}>{msg}</div>}

      <div style={{ display:'flex', gap:4, marginBottom:20, background:'#f1f5f9', borderRadius:10, padding:4, width:'fit-content' }}>
        {[['events','🎯 Events'],['profiles','👤 Student Profiles']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{ padding:'8px 20px', borderRadius:8, border:'none', cursor:'pointer', fontSize:13, fontWeight:600,
              background: tab===k ? '#fff' : 'transparent', color: tab===k ? '#4f46e5' : '#64748b',
              boxShadow: tab===k ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'events' && (
        <>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
            <Btn onClick={() => setShowForm(!showForm)}>+ Post Event</Btn>
          </div>

          {showForm && (
            <Card style={{ marginBottom:20, borderLeft:'4px solid #f59e0b' }}>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Post New Event</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Event Title</label>
                  <input value={form.title} onChange={e => setForm({...form, title:e.target.value})} placeholder="e.g. HackVIT 2025"
                    style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
                </div>
                {[['category','Category','select'],['teamSize','Team Size','number'],['requiredSkills','Required Skills','text'],['eventDate','Event Date','date'],['registrationDeadline','Registration Deadline','date']].map(([k,l,t]) => (
                  <div key={k}>
                    <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>{l}</label>
                    {t==='select' ? (
                      <select value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, background:'#fff' }}>
                        {['HACKATHON','COMPETITION','PROJECT','WORKSHOP','OTHER'].map(v=><option key={v}>{v}</option>)}
                      </select>
                    ) : (
                      <input type={t} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
                    )}
                  </div>
                ))}
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description:e.target.value})} rows={3}
                    style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, resize:'vertical' }} />
                </div>
              </div>
              <div style={{ display:'flex', gap:10, marginTop:16 }}>
                <Btn onClick={handleCreate}>Post Event</Btn>
                <Btn variant="outline" onClick={() => setShowForm(false)}>Cancel</Btn>
              </div>
            </Card>
          )}

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:16 }}>
            {displayEvents.map(e => {
              const color = catColors[e.category] || '#8b5cf6';
              const daysLeft = e.registrationDeadline ? Math.ceil((new Date(e.registrationDeadline)-new Date())/86400000) : null;
              return (
                <Card key={e.id} style={{ display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                    <span style={{ background:color+'15', color, padding:'3px 10px', borderRadius:6, fontSize:11, fontWeight:700 }}>{e.category}</span>
                    {daysLeft !== null && <span style={{ fontSize:11, color: daysLeft<=7?'#ef4444':'#64748b', fontWeight:600 }}>{daysLeft>0?`${daysLeft}d to register`:'Closed'}</span>}
                  </div>
                  <h4 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:6 }}>{e.title}</h4>
                  <p style={{ fontSize:13, color:'#64748b', marginBottom:12, flex:1, lineHeight:1.5 }}>{e.description}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:12 }}>
                    <div style={{ fontSize:12, color:'#64748b' }}>👥 Team: {e.teamSize} members</div>
                    <div style={{ fontSize:12, color:'#64748b' }}>📅 {formatDate(e.eventDate)}</div>
                    <div style={{ fontSize:12, color:'#64748b', gridColumn:'1/-1' }}>🛠 {e.requiredSkills}</div>
                    <div style={{ fontSize:12, color:'#64748b' }}>👤 By {e.creator?.name}</div>
                  </div>
                  <button onClick={() => handleApply(e.id)} disabled={applied[e.id]}
                    style={{ padding:'9px', background: applied[e.id]?'#d1fae5':'#4f46e5', color: applied[e.id]?'#065f46':'#fff', border:'none', borderRadius:8, cursor: applied[e.id]?'default':'pointer', fontSize:13, fontWeight:600 }}>
                    {applied[e.id] ? '✓ Applied!' : 'Apply to Join'}
                  </button>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {tab === 'profiles' && (
        <>
          <div style={{ marginBottom:16 }}>
            <input value={skillFilter} onChange={e => setSkillFilter(e.target.value)}
              placeholder="🔍 Search by skill or interest (e.g. React, ML, Python)"
              style={{ width:'100%', maxWidth:420, padding:'10px 16px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14, outline:'none' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
            {filteredProfiles.map(p => (
              <Card key={p.id} style={{ textAlign:'center' }}>
                <div style={{ width:60, height:60, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:22, fontWeight:700, margin:'0 auto 12px' }}>
                  {p.name.charAt(0)}
                </div>
                <h4 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b' }}>{p.name}</h4>
                <div style={{ fontSize:12, color:'#6366f1', fontWeight:600, marginBottom:8 }}>{p.roll} · CGPA {p.cgpa}</div>
                <div style={{ marginBottom:8 }}>
                  {p.skills.split(',').map(s => (
                    <span key={s} style={{ display:'inline-block', margin:'2px', background:'#eef2ff', color:'#4f46e5', padding:'2px 8px', borderRadius:20, fontSize:11, fontWeight:600 }}>{s.trim()}</span>
                  ))}
                </div>
                <div style={{ fontSize:12, color:'#64748b', marginBottom:12 }}>💡 {p.interests}</div>
                <button style={{ width:'100%', padding:'8px', background:'#4f46e5', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600 }}>
                  Connect →
                </button>
              </Card>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
