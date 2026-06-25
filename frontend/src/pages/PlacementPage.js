import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { opportunityService } from '../services/api';
import { Card, PageTitle, Btn, formatDate } from '../utils/helpers';

const mockOpps = [
  { id:1, type:'PLACEMENT', company:'TCS', title:'Software Engineer', description:'Join TCS as a Software Engineer. Work on cutting-edge enterprise projects across banking, retail, and healthcare domains.', eligibility:'CGPA ≥ 7.0, CSE/IT', salaryPackage:'3.5 LPA', location:'Chennai', applyLink:'#', deadline:'2025-07-15', isActive:true },
  { id:2, type:'PLACEMENT', company:'Infosys', title:'Systems Engineer', description:'Infosys Systems Engineer program with training in Java, .NET, and cloud technologies.', eligibility:'CGPA ≥ 6.5, All branches', salaryPackage:'4.0 LPA', location:'Bangalore', applyLink:'#', deadline:'2025-07-20', isActive:true },
  { id:3, type:'INTERNSHIP', company:'Zoho', title:'Software Development Intern', description:'6-month internship at Zoho working on real products. Full-time offer on completion.', eligibility:'3rd year, CGPA ≥ 7.5', salaryPackage:'₹20,000/month', location:'Chennai', applyLink:'#', deadline:'2025-06-30', isActive:true },
  { id:4, type:'HACKATHON', company:'Smart India Hackathon', title:'SIH 2025', description:'National level hackathon solving real government problems. Prizes worth ₹1 lakh.', eligibility:'All branches, team of 6', salaryPackage:'₹1,00,000 prize', location:'Online + Offline', applyLink:'#', deadline:'2025-07-10', isActive:true },
  { id:5, type:'SDP', company:'NPTEL', title:'Python for Data Science', description:'NPTEL 12-week certification course on Python, Pandas, NumPy, and ML basics.', eligibility:'All students', salaryPackage:'Free (₹1000 exam fee)', location:'Online', applyLink:'#', deadline:'2025-07-01', isActive:true },
  { id:6, type:'INTERNSHIP', company:'Amazon', title:'SDE Intern', description:'Amazon Summer Internship in SDE role. Work with world-class engineers on AWS or retail products.', eligibility:'CGPA ≥ 8.0, CSE only', salaryPackage:'₹70,000/month', location:'Hyderabad', applyLink:'#', deadline:'2025-06-28', isActive:true },
];

const typeColors = { PLACEMENT:'#6366f1', INTERNSHIP:'#0ea5e9', HACKATHON:'#f59e0b', SDP:'#10b981', OTHER:'#8b5cf6' };
const typeIcons = { PLACEMENT:'💼', INTERNSHIP:'🏢', HACKATHON:'⚡', SDP:'📚', OTHER:'🔗' };

export default function PlacementPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [opps, setOpps] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type:'PLACEMENT', company:'', title:'', description:'', eligibility:'', salaryPackage:'', location:'', applyLink:'', deadline:'' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    opportunityService.getAll().then(r => setOpps(r.data?.data || [])).catch(() => setOpps(mockOpps));
  }, []);

  const displayOpps = (opps.length ? opps : mockOpps).filter(o => filter === 'ALL' || o.type === filter);

  const handleCreate = async () => {
    try { await opportunityService.create(form); } catch {}
    setOpps([{ id:Date.now(), ...form, isActive:true, postedBy:{ name:user?.name } }, ...opps]);
    setMsg('Opportunity posted!');
    setShowForm(false);
  };

  return (
    <Layout>
      <PageTitle title="Placements & Opportunities" subtitle="Explore job openings, internships, hackathons and skill programs" />
      {msg && <div style={{ background:'#d1fae5', color:'#065f46', padding:'10px 16px', borderRadius:8, marginBottom:16 }}>{msg}</div>}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {['ALL','PLACEMENT','INTERNSHIP','HACKATHON','SDP'].map(t => (
            <button key={t} onClick={() => setFilter(t)}
              style={{ padding:'7px 16px', border:`1.5px solid ${filter===t?(typeColors[t]||'#6366f1'):'#e2e8f0'}`, borderRadius:20, cursor:'pointer', fontSize:13, fontWeight:600,
                background: filter===t?(typeColors[t]||'#6366f1'):'#fff', color: filter===t?'#fff':'#374151' }}>
              {t === 'ALL' ? '🔍 All' : `${typeIcons[t]} ${t}`}
            </button>
          ))}
        </div>
        {isAdmin && <Btn onClick={() => setShowForm(!showForm)}>+ Post Opportunity</Btn>}
      </div>

      {showForm && (
        <Card style={{ marginBottom:20, borderLeft:'4px solid #f59e0b' }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Post New Opportunity</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[['type','Type','select'],['company','Company','text'],['title','Title','text'],['eligibility','Eligibility','text'],['salaryPackage','Package/Prize','text'],['location','Location','text'],['applyLink','Apply Link (URL)','url'],['deadline','Deadline','date']].map(([k,l,t]) => (
              <div key={k}>
                <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>{l}</label>
                {t === 'select' ? (
                  <select value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, background:'#fff' }}>
                    {['PLACEMENT','INTERNSHIP','HACKATHON','SDP','OTHER'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <input type={t} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
                )}
              </div>
            ))}
            <div style={{ gridColumn:'1/-1' }}>
              <label style={{ fontSize:13, fontWeight:600, display:'block', marginBottom:6 }}>Description</label>
              <textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} rows={3}
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, resize:'vertical' }} />
            </div>
          </div>
          <div style={{ display:'flex', gap:10, marginTop:16 }}>
            <Btn onClick={handleCreate}>Post Opportunity</Btn>
            <Btn variant="outline" onClick={() => setShowForm(false)}>Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:16 }}>
        {displayOpps.map(o => {
          const color = typeColors[o.type] || '#6b7280';
          const daysLeft = o.deadline ? Math.ceil((new Date(o.deadline) - new Date()) / 86400000) : null;
          return (
            <Card key={o.id} style={{ display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <div>
                  <span style={{ background:color+'15', color, padding:'3px 10px', borderRadius:6, fontSize:11, fontWeight:700 }}>{typeIcons[o.type]} {o.type}</span>
                  {daysLeft !== null && daysLeft <= 7 && <span style={{ marginLeft:6, background:'#fee2e2', color:'#dc2626', padding:'3px 8px', borderRadius:6, fontSize:11, fontWeight:700 }}>⏰ {daysLeft}d left</span>}
                </div>
              </div>
              <h4 style={{ fontSize:15, fontWeight:700, color:'#1e1b4b', marginBottom:4 }}>{o.title}</h4>
              <div style={{ fontSize:13, color:color, fontWeight:600, marginBottom:8 }}>{o.company}</div>
              <p style={{ fontSize:13, color:'#64748b', marginBottom:12, lineHeight:1.5, flex:1 }}>{o.description?.substring(0,120)}...</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
                {[['💰',o.salaryPackage],['📍',o.location],['🎯',o.eligibility],['📅',formatDate(o.deadline)]].map(([icon,val],i) => val && (
                  <div key={i} style={{ fontSize:11, color:'#64748b', display:'flex', alignItems:'center', gap:4 }}>
                    <span>{icon}</span><span style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{val}</span>
                  </div>
                ))}
              </div>
              <a href={o.applyLink || '#'} target="_blank" rel="noreferrer"
                style={{ display:'block', textAlign:'center', padding:'9px', background:color, color:'#fff', borderRadius:8, textDecoration:'none', fontSize:13, fontWeight:600 }}>
                Apply Now →
              </a>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
}
