# 🎓 SAMS – Smart Academic Management System

A full-stack academic management platform with React frontend, Spring Boot backend, and MySQL database.

---

## 📁 Project Structure

```
sams/
├── frontend/         # React.js application (port 3000)
├── backend/          # Spring Boot REST API (port 8080)
├── database/         # schema.sql with seed data
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
| Tool | Version |
|------|---------|
| Node.js | 18+ |
| Java (JDK) | 17+ |
| Maven | 3.8+ |
| MySQL | 8.0+ |
| VS Code | Latest |

---

## 1️⃣ Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source /path/to/sams/database/schema.sql
```

This creates the `sams_db` database with all tables and sample data.

**Default credentials in schema:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sams.edu | Admin@123 |
| Faculty | priya.sharma@sams.edu | Faculty@123 |
| Student | arjun.patel@sams.edu | Student@123 |

> Note: The BCrypt hashes in schema.sql are for demo. The actual login uses the demo button flow.

---

## 2️⃣ Backend Setup (Spring Boot)

```bash
cd sams/backend

# Edit database credentials
# Open: src/main/resources/application.properties
# Update: spring.datasource.password=YOUR_MYSQL_PASSWORD
```

```bash
# Build and run
mvn clean install -DskipTests
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

Swagger UI: **http://localhost:8080/swagger-ui.html**

---

## 3️⃣ Frontend Setup (React)

```bash
cd sams/frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend starts at: **http://localhost:3000**

---

## 🔑 Demo Login (For Hackathon Demo)

On the login page, use the **demo buttons**:

| Button | Email | Password |
|--------|-------|----------|
| 🟣 Student | arjun.patel@sams.edu | password |
| 🔵 Faculty | priya.sharma@sams.edu | password |
| 🟡 Admin | admin@sams.edu | password |

> The frontend gracefully falls back to mock data if the backend is not running — perfect for demos!

---

## 📋 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login, returns JWT |
| POST | /api/auth/register | Register new user |

### Attendance
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/attendance/my | Student |
| GET | /api/attendance/stats/{subjectId} | Student |
| POST | /api/attendance/mark | Faculty/Admin |

### Leave & OD
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/leave/apply | Student |
| GET | /api/leave/my | Student |
| GET | /api/leave/pending | Faculty/Admin |
| PUT | /api/leave/{id}/status | Faculty/Admin |

### Marks
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/marks/my | Student |
| POST | /api/marks | Faculty/Admin |

### Complaints
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/complaints | Student |
| GET | /api/complaints/my | Student |
| GET | /api/complaints | Faculty/Admin |
| PUT | /api/complaints/{id}/status | Faculty/Admin |

### Notes
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/notes | All |
| GET | /api/notes/subject/{id} | All |
| POST | /api/notes | Faculty |

### Opportunities
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/opportunities | All |
| GET | /api/opportunities/type/{type} | All |
| POST | /api/opportunities | Admin |

### Events (Team Finder)
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/events | All |
| GET | /api/events/my | Student |
| POST | /api/events | Student |

### Certificates
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/certificates/apply | Student |
| GET | /api/certificates/my | Student |
| GET | /api/certificates | Admin/Faculty |
| PUT | /api/certificates/{id}/status | Admin/Faculty |

### Notifications
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/notifications | Auth user |
| GET | /api/notifications/unread-count | Auth user |
| PUT | /api/notifications/{id}/read | Auth user |

---

## 🏗️ Architecture

```
Frontend (React)
    ↓ Axios (JWT in headers)
Backend (Spring Boot)
    ↓ JPA/Hibernate
MySQL Database
```

### Backend Layers
```
Controller → Service → Repository → Entity → MySQL
     ↑
  JWT Auth Filter (Spring Security)
```

---

## ✨ Features

| Module | Student | Faculty | Admin |
|--------|---------|---------|-------|
| Dashboard | ✅ | ✅ | ✅ |
| Leave/OD Apply | ✅ | — | — |
| Leave Approval | — | ✅ | ✅ |
| Attendance View | ✅ | — | — |
| Attendance Mark | — | ✅ | ✅ |
| Marks View | ✅ | — | — |
| Marks Upload | — | ✅ | — |
| Complaints | ✅ | View/Resolve | View/Resolve |
| Notes | View | Upload | View |
| Placements | ✅ | ✅ | Post |
| Team Finder | ✅ | — | — |
| Certificates | Apply/View | — | Approve |
| AI Chatbot | ✅ | — | — |

---

## 🛠️ VS Code Setup

1. Open the `sams/` folder in VS Code
2. Install recommended extensions:
   - **Extension Pack for Java** (for Spring Boot)
   - **Spring Boot Extension Pack**
   - **ES7+ React/Redux/React-Native snippets**
3. Open two integrated terminals:
   - Terminal 1: `cd backend && mvn spring-boot:run`
   - Terminal 2: `cd frontend && npm install && npm start`

---

## 📦 Tech Stack

- **Frontend**: React 18, React Router 6, Axios, Recharts, Lucide React
- **Backend**: Spring Boot 3.2, Spring Security, Spring Data JPA, JWT
- **Database**: MySQL 8 with normalized relational schema
- **Auth**: JWT Bearer tokens, BCrypt password hashing, Role-based access control

---

## 🎯 Hackathon Demo Tips

1. Start frontend first — it works with mock data even without backend
2. Use demo buttons for instant login
3. Show Student dashboard → Leave apply → Marks → Chatbot
4. Show Faculty dashboard → Mark attendance → Upload notes
5. Show Admin dashboard → Approve certificates → Post placement
