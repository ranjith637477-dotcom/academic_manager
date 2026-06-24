export const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '-';
export const statusColor = (s) => ({ PENDING:'#f59e0b', APPROVED:'#10b981', REJECTED:'#ef4444', SUBMITTED:'#6366f1', IN_REVIEW:'#f59e0b', RESOLVED:'#10b981', CLOSED:'#6b7280', PROCESSING:'#0ea5e9', PRESENT:'#10b981', ABSENT:'#ef4444', OD:'#6366f1', LEAVE:'#f59e0b' }[s] || '#6b7280');
export const statusBg = (s) => ({ PENDING:'#fef3c7', APPROVED:'#d1fae5', REJECTED:'#fee2e2', SUBMITTED:'#eef2ff', IN_REVIEW:'#fef3c7', RESOLVED:'#d1fae5', CLOSED:'#f3f4f6', PROCESSING:'#e0f2fe', PRESENT:'#d1fae5', ABSENT:'#fee2e2', OD:'#eef2ff', LEAVE:'#fef3c7' }[s] || '#f3f4f6');
export const Badge = ({ status }) => (
  <span style={{ background:statusBg(status), color:statusColor(status), padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700 }}>{status}</span>
);
export const Card = ({ children, style={} }) => (
  <div style={{ background:'#fff', borderRadius:14, padding:24, boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #f1f5f9', ...style }}>{children}</div>
);
export const PageTitle = ({ title, subtitle }) => (
  <div style={{ marginBottom:24 }}>
    <h1 style={{ fontSize:22, fontWeight:700, color:'#1e1b4b' }}>{title}</h1>
    {subtitle && <p style={{ color:'#64748b', fontSize:14, marginTop:4 }}>{subtitle}</p>}
  </div>
);
export const Btn = ({ children, variant='primary', ...props }) => {
  const styles = { primary:{ background:'#4f46e5', color:'#fff' }, success:{ background:'#10b981', color:'#fff' }, danger:{ background:'#ef4444', color:'#fff' }, outline:{ background:'transparent', color:'#4f46e5', border:'1.5px solid #4f46e5' } };
  return <button {...props} style={{ padding:'9px 20px', borderRadius:8, border:'none', cursor:'pointer', fontSize:14, fontWeight:600, ...styles[variant], ...props.style }}>{children}</button>;
};
