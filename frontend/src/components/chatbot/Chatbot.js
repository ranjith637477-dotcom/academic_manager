import React, { useState, useRef, useEffect } from 'react';

const faqs = {
  'leave': 'To apply for Leave or OD: go to the Leave & OD page, click "Apply for Leave/OD", choose the type, fill in dates and reason, then submit. OD must be applied at least 1 day before the event. Leave goes through Class Incharge → HOD (for OD) → Coordinator.',
  'od': 'On-Duty (OD) applications must be submitted at least 1 day before the event. The approval flow is: Class Incharge → HOD → Coordinator. Provide the event name and supporting reason.',
  'attendance': 'Your attendance is tracked per subject. The minimum required is 75%. You can view subject-wise percentages in the Attendance page. OD and approved Leave days are not counted as absences.',
  'marks': 'Marks are updated by faculty after each internal exam. You have 3 internals (50 marks each), Lab marks (50), and Assignments (20). Total is 220. Visit the Marks page for a full breakdown and grade analysis.',
  'complaint': 'You can file two types of complaints: Academic (faculty behavior, teaching quality) and Management (infrastructure issues). Go to the Complaints page, click "File Complaint", fill in the details, and submit. You can also submit anonymously.',
  'notes': 'Faculty upload notes organized by subject and lesson number. Each note has an AI-generated summary to help you study quickly. Visit the Notes page to access all class notes.',
  'placement': 'The Placements page shows job openings, internships, hackathons, and skill development programs (SDP). You can filter by type and apply directly. Check deadlines to not miss out!',
  'team': 'The Team Finder lets you post events (hackathons, projects) and find teammates. You can also browse student profiles and filter by skills or interests to find the right collaborators.',
  'certificate': 'Students can apply for: Bonafide, No Due, Transfer Certificate, or Other. Go to the Certificates page and select the type. Applications are reviewed by Admin and status is updated in real-time.',
  'dashboard': 'Your dashboard shows attendance percentage, recent notifications, marks overview, quick actions, and upcoming events — all in one place.',
  'login': 'Use your registered college email and password to log in. The system supports Student, Faculty, and Admin roles — each with a tailored dashboard.',
  'help': 'I can help you with: Leave/OD applications, Attendance tracking, Marks & grades, Complaints, Faculty Notes, Placements, Team Finder, Certificates, and general navigation.',
};

const findAnswer = (q) => {
  const lower = q.toLowerCase();
  for (const [key, answer] of Object.entries(faqs)) {
    if (lower.includes(key)) return answer;
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return "Hello! I'm your SAMS assistant 🤖 I can help you with leave applications, attendance, marks, complaints, notes, placements, team finder, and certificates. What would you like to know?";
  }
  return "I'm not sure about that. I can help you with: Leave/OD applications, Attendance, Marks, Complaints, Notes, Placements, Team Finder, and Certificates. Try asking about any of these!";
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role:'bot', text:"Hi! 👋 I'm your SAMS assistant. I can help with leave applications, attendance queries, marks, placements, and more. What do you need help with?" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { role:'user', text:userMsg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(userMsg);
      setMessages(m => [...m, { role:'bot', text:answer }]);
      setTyping(false);
    }, 800);
  };

  const quickQuestions = ['How to apply for leave?', 'Check attendance', 'View my marks', 'Apply for certificate'];

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(!open)}
        style={{ position:'fixed', bottom:24, right:24, width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff', border:'none', cursor:'pointer', fontSize:24, boxShadow:'0 4px 20px rgba(79,70,229,0.4)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', transition:'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{ position:'fixed', bottom:92, right:24, width:360, height:500, background:'#fff', borderRadius:20, boxShadow:'0 20px 60px rgba(0,0,0,0.2)', display:'flex', flexDirection:'column', zIndex:1000, overflow:'hidden', border:'1px solid #e5e7eb' }}>
          {/* Header */}
          <div style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)', padding:'16px 20px', color:'#fff' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:36, height:36, background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🤖</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14 }}>SAMS Assistant</div>
                <div style={{ fontSize:11, opacity:0.85 }}>● Online — Ready to help</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display:'flex', justifyContent: m.role==='user'?'flex-end':'flex-start' }}>
                <div style={{ maxWidth:'82%', padding:'10px 14px', borderRadius: m.role==='user'?'18px 18px 4px 18px':'18px 18px 18px 4px',
                  background: m.role==='user'?'linear-gradient(135deg,#4f46e5,#7c3aed)':'#f1f5f9', color: m.role==='user'?'#fff':'#374151', fontSize:13, lineHeight:1.5 }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display:'flex', gap:4, padding:'10px 14px', background:'#f1f5f9', borderRadius:'18px 18px 18px 4px', width:'fit-content' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width:8, height:8, background:'#9ca3af', borderRadius:'50%', animation:`bounce 1.2s ${i*0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div style={{ padding:'0 12px 8px', display:'flex', flexWrap:'wrap', gap:6 }}>
              {quickQuestions.map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(send, 100); }}
                  style={{ padding:'5px 10px', background:'#eef2ff', color:'#4f46e5', border:'1px solid #c7d2fe', borderRadius:20, cursor:'pointer', fontSize:11, fontWeight:600 }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:'12px 16px', borderTop:'1px solid #f1f5f9', display:'flex', gap:8 }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send()}
              placeholder="Ask me anything..."
              style={{ flex:1, padding:'9px 14px', border:'1.5px solid #e5e7eb', borderRadius:24, fontSize:13, outline:'none' }}
              onFocus={e => e.target.style.borderColor='#6366f1'}
              onBlur={e => e.target.style.borderColor='#e5e7eb'} />
            <button onClick={send}
              style={{ width:38, height:38, background:'#4f46e5', color:'#fff', border:'none', borderRadius:'50%', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }`}</style>
    </>
  );
}
