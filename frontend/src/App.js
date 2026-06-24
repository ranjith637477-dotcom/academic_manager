import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LeavePage from './pages/LeavePage';
import AttendancePage from './pages/AttendancePage';
import MarksPage from './pages/MarksPage';
import ComplaintsPage from './pages/ComplaintsPage';
import NotesPage from './pages/NotesPage';
import PlacementPage from './pages/PlacementPage';
import TeamFinderPage from './pages/TeamFinderPage';
import CertificatePage from './pages/CertificatePage';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',fontSize:'18px'}}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const DashboardRouter = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'STUDENT') return <StudentDashboard />;
  if (user.role === 'FACULTY') return <FacultyDashboard />;
  if (user.role === 'ADMIN') return <AdminDashboard />;
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><DashboardRouter /></PrivateRoute>} />
          <Route path="/leave" element={<PrivateRoute><LeavePage /></PrivateRoute>} />
          <Route path="/attendance" element={<PrivateRoute><AttendancePage /></PrivateRoute>} />
          <Route path="/marks" element={<PrivateRoute><MarksPage /></PrivateRoute>} />
          <Route path="/complaints" element={<PrivateRoute><ComplaintsPage /></PrivateRoute>} />
          <Route path="/notes" element={<PrivateRoute><NotesPage /></PrivateRoute>} />
          <Route path="/placement" element={<PrivateRoute><PlacementPage /></PrivateRoute>} />
          <Route path="/team-finder" element={<PrivateRoute><TeamFinderPage /></PrivateRoute>} />
          <Route path="/certificates" element={<PrivateRoute roles={['STUDENT']}><CertificatePage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
