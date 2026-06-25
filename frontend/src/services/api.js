import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sams_token');
      localStorage.removeItem('sams_user');
      window.location.href = `${process.env.PUBLIC_URL || ''}/login`;
    }
    return Promise.reject(err);
  }
);

export const authService = {
  login: (data) => api.post('/api/auth/login', data),
  register: (data) => api.post('/api/auth/register', data),
};

export const attendanceService = {
  getMyAttendance: () => api.get('/api/attendance/my'),
  getStats: (subjectId) => api.get(`/api/attendance/stats/${subjectId}`),
  markAttendance: (data) => api.post('/api/attendance/mark', data),
};

export const leaveService = {
  apply: (data) => api.post('/api/leave/apply', data),
  getMyApplications: () => api.get('/api/leave/my'),
  getPending: () => api.get('/api/leave/pending'),
  updateStatus: (id, data) => api.put(`/api/leave/${id}/status`, data),
};

export const marksService = {
  getMyMarks: () => api.get('/api/marks/my'),
  saveMarks: (data) => api.post('/api/marks', data),
};

export const complaintService = {
  submit: (data) => api.post('/api/complaints', data),
  getMy: () => api.get('/api/complaints/my'),
  getAll: () => api.get('/api/complaints'),
  updateStatus: (id, data) => api.put(`/api/complaints/${id}/status`, data),
};

export const notesService = {
  getAll: () => api.get('/api/notes'),
  getBySubject: (id) => api.get(`/api/notes/subject/${id}`),
  upload: (data) => api.post('/api/notes', data),
};

export const opportunityService = {
  getAll: () => api.get('/api/opportunities'),
  getByType: (type) => api.get(`/api/opportunities/type/${type}`),
  create: (data) => api.post('/api/opportunities', data),
};

export const eventService = {
  getAll: () => api.get('/api/events'),
  getMy: () => api.get('/api/events/my'),
  create: (data) => api.post('/api/events', data),
};

export const certificateService = {
  apply: (data) => api.post('/api/certificates/apply', data),
  getMy: () => api.get('/api/certificates/my'),
  getAll: () => api.get('/api/certificates'),
  updateStatus: (id, data) => api.put(`/api/certificates/${id}/status`, data),
};

export const notificationService = {
  getMy: () => api.get('/api/notifications'),
  getUnreadCount: () => api.get('/api/notifications/unread-count'),
  markRead: (id) => api.put(`/api/notifications/${id}/read`),
};

export default api;
