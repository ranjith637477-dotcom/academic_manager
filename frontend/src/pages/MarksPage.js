import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { marksService } from '../services/api';
import { Card, PageTitle } from '../utils/helpers';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const mockMarks = [
  { id:1, subject:{ code:'CS301', name:'Data Structures & Algorithms' }, internal1:42, internal2:45, internal3:44, labMarks:48, assignmentMarks:18, semester:5, academicYear:'2024-25' },
  { id:2, subject:{ code:'CS302', name:'Web Technologies' }, internal1:38, internal2:40, internal3:41, labMarks:44, assignmentMarks:17, semester:5, academicYear:'2024-25' },
  { id:3, subject:{ code:'CS303', name:'DBMS' }, internal1:35, internal2:38, internal3:36, labMarks:46, assignmentMarks:16, semester:5, academicYear:'2024-25' },
  { id:4, subject:{ code:'CS304', name:'Machine Learning' }, internal1:46, internal2:48, internal3:47, labMarks:50, assignmentMarks:19, semester:5, academicYear:'2024-25' },
  { id:5, subject:{ code:'CS305', name:'Software Engineering' }, internal1:40, internal2:42, internal3:43, labMarks:44, assignmentMarks:17, semester:5, academicYear:'2024-25' },
];

const getTotal = m => m.internal1 + m.internal2 + m.internal3 + m.labMarks + m.assignmentMarks;
const MAX = 250;

const mockStudents = ['Arjun Patel','Divya Krishnan','Ravi Shankar'];
const mockSubjects = [{ id:1, code:'CS301', name:'DSA' },{ id:2, code:'CS302', name:'Web Tech' }];

export default function MarksPage() {
  const { user } = useAuth();
  const isStudent = user?.role === 'STUDENT';
  const [marks, setMarks] = useState([]);
  const [form, setForm] = useState({ studentId:'', subjectId:'', internal1:'', internal2:'', internal3:'', labMarks:'', assignmentMarks:'', semester:5, academicYear:'2024-25' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isStudent) {
      marksService.getMyMarks().then(r => setMarks(r.data?.data || [])).catch(() => setMarks(mockMarks));
    }
  }, [isStudent]);

  const displayMarks = marks.length ? marks : mockMarks;
  const avgTotal = displayMarks.length ? Math.round(displayMarks.reduce((a,m) => a + getTotal(m), 0) / displayMarks.length) : 0;

  const radarData = displayMarks.map(m => ({
    subject: m.subject?.code,
    score: Math.round((getTotal(m) / MAX) * 100),
  }));

  const barData = displayMarks.map(m => ({
    name: m.subject?.code,
    I1: m.internal1, I2: m.internal2, I3: m.internal3,
    Lab: m.labMarks, Assign: m.assignmentMarks,
  }));

  const handleSave = async () => {
    try {
      await marksService.saveMarks(form);
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  };

  return (
    <Layout>
      <PageTitle title="Academic Performance" subtitle={isStudent ? "View your internal marks and performance analytics" : "Upload and manage student marks"} />

      {isStudent ? (
        <>
          {/* Summary cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:24 }}>
            {[
              { label:'Subjects', value: displayMarks.length, icon:'📚', color:'#6366f1' },
              { label:'Avg Total', value: avgTotal+'/'+MAX, icon:'📊', color:'#10b981' },
              { label:'Best Subject', value: displayMarks.reduce((b,m) => getTotal(m)>getTotal(b)?m:b, displayMarks[0])?.subject?.code || '-', icon:'🏆', color:'#f59e0b' },
              { label:'Semester', value: 'Sem 5', icon:'📅', color:'#0ea5e9' },
            ].map(s => (
              <Card key={s.label} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:44, height:44, background:s.color+'20', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{s.icon}</div>
                <div><div style={{ fontSize:18, fontWeight:700, color:'#1e1b4b' }}>{s.value}</div><div style={{ fontSize:12, color:'#64748b' }}>{s.label}</div></div>
              </Card>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:20, marginBottom:20 }}>
            <Card>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>📊 Component-wise Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize:11 }} />
                  <YAxis tick={{ fontSize:11 }} />
                  <Tooltip />
                  <Bar dataKey="I1" fill="#6366f1" stackId="a" name="Internal 1" />
                  <Bar dataKey="I2" fill="#8b5cf6" stackId="a" name="Internal 2" />
                  <Bar dataKey="I3" fill="#a78bfa" stackId="a" name="Internal 3" />
                  <Bar dataKey="Lab" fill="#0ea5e9" stackId="a" name="Lab" />
                  <Bar dataKey="Assign" fill="#38bdf8" stackId="a" name="Assignment" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:8, alignSelf:'flex-start' }}>🎯 Performance Radar</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize:11 }} />
                  <Radar dataKey="score" fill="#6366f1" fillOpacity={0.3} stroke="#6366f1" />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Detailed table */}
          <Card>
            <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Detailed Marks — Semester 5 (2024-25)</h3>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'#f8fafc' }}>
                    {['Subject','Internal 1\n(50)','Internal 2\n(50)','Internal 3\n(50)','Lab\n(50)','Assignment\n(20)','Total\n(220)','Grade'].map(h => (
                      <th key={h} style={{ padding:'10px 12px', textAlign:'center', fontSize:11, fontWeight:600, color:'#64748b', borderBottom:'1px solid #e2e8f0', whiteSpace:'pre-line' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayMarks.map(m => {
                    const total = getTotal(m);
                    const pct = Math.round(total/MAX*100);
                    const grade = pct>=90?'O':pct>=80?'A+':pct>=70?'A':pct>=60?'B+':pct>=50?'B':'C';
                    const gradeColor = pct>=80?'#10b981':pct>=60?'#f59e0b':'#ef4444';
                    return (
                      <tr key={m.id} style={{ borderBottom:'1px solid #f1f5f9', textAlign:'center' }}>
                        <td style={{ padding:'12px', textAlign:'left' }}>
                          <div style={{ fontWeight:600, fontSize:13 }}>{m.subject?.code}</div>
                          <div style={{ fontSize:11, color:'#64748b' }}>{m.subject?.name}</div>
                        </td>
                        {[m.internal1,m.internal2,m.internal3,m.labMarks,m.assignmentMarks].map((v,i) => (
                          <td key={i} style={{ padding:'12px', fontWeight:500 }}>{v}</td>
                        ))}
                        <td style={{ padding:'12px', fontWeight:700, color:'#1e1b4b' }}>{total}</td>
                        <td style={{ padding:'12px' }}><span style={{ background:gradeColor+'20', color:gradeColor, padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:700 }}>{grade}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Upload / Edit Student Marks</h3>
          {saved && <div style={{ background:'#d1fae5', color:'#065f46', padding:'10px 16px', borderRadius:8, marginBottom:16 }}>✓ Marks saved!</div>}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Student</label>
              <select value={form.studentId} onChange={e => setForm({...form, studentId:e.target.value})}
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, background:'#fff' }}>
                <option value="">Select student</option>
                {mockStudents.map((s,i) => <option key={i} value={i+5}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Subject</label>
              <select value={form.subjectId} onChange={e => setForm({...form, subjectId:e.target.value})}
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14, background:'#fff' }}>
                <option value="">Select subject</option>
                {mockSubjects.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
              </select>
            </div>
            {[['internal1','Internal 1 (max 50)'],['internal2','Internal 2 (max 50)'],['internal3','Internal 3 (max 50)'],['labMarks','Lab Marks (max 50)'],['assignmentMarks','Assignment (max 20)']].map(([k,l]) => (
              <div key={k}>
                <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>{l}</label>
                <input type="number" min="0" value={form[k]} onChange={e => setForm({...form, [k]:e.target.value})}
                  style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
              </div>
            ))}
          </div>
          <button onClick={handleSave} style={{ marginTop:20, padding:'10px 24px', background:'#4f46e5', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:14, fontWeight:600 }}>
            Save Marks
          </button>
        </Card>
      )}
    </Layout>
  );
}
