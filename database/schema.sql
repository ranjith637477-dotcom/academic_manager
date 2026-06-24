-- ============================================================
-- Smart Academic Management System - Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS sams_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sams_db;

-- ------------------------------------------------------------
-- ROLES
-- ------------------------------------------------------------
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('STUDENT', 'FACULTY', 'ADMIN') NOT NULL UNIQUE
);

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    profile_pic VARCHAR(255),
    role_id BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- ------------------------------------------------------------
-- DEPARTMENTS
-- ------------------------------------------------------------
CREATE TABLE departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    hod_id BIGINT,
    FOREIGN KEY (hod_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- CLASSES
-- ------------------------------------------------------------
CREATE TABLE classes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    section VARCHAR(5),
    year INT NOT NULL,
    department_id BIGINT NOT NULL,
    incharge_id BIGINT,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (incharge_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- STUDENT PROFILES
-- ------------------------------------------------------------
CREATE TABLE student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    class_id BIGINT NOT NULL,
    department_id BIGINT NOT NULL,
    batch VARCHAR(10),
    skills TEXT,
    interests TEXT,
    cgpa DECIMAL(4,2),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- ------------------------------------------------------------
-- FACULTY PROFILES
-- ------------------------------------------------------------
CREATE TABLE faculty_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    department_id BIGINT NOT NULL,
    designation VARCHAR(100),
    specialization VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- ------------------------------------------------------------
-- SUBJECTS
-- ------------------------------------------------------------
CREATE TABLE subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    credits INT DEFAULT 3,
    department_id BIGINT NOT NULL,
    faculty_id BIGINT,
    semester INT,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (faculty_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- ATTENDANCE
-- ------------------------------------------------------------
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    date DATE NOT NULL,
    status ENUM('PRESENT','ABSENT','OD','LEAVE') DEFAULT 'ABSENT',
    marked_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_attendance (student_id, subject_id, date),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (marked_by) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- LEAVE / OD APPLICATIONS
-- ------------------------------------------------------------
CREATE TABLE leave_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    type ENUM('LEAVE','OD') NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NOT NULL,
    event_name VARCHAR(200),
    document_url VARCHAR(255),
    -- Approval chain
    incharge_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    incharge_remark VARCHAR(255),
    incharge_at TIMESTAMP,
    hod_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    hod_remark VARCHAR(255),
    hod_at TIMESTAMP,
    coordinator_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    coordinator_remark VARCHAR(255),
    coordinator_at TIMESTAMP,
    final_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- CERTIFICATES
-- ------------------------------------------------------------
CREATE TABLE certificate_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    type ENUM('BONAFIDE','NO_DUE','TRANSFER','OTHER') NOT NULL,
    reason TEXT,
    status ENUM('PENDING','PROCESSING','APPROVED','REJECTED') DEFAULT 'PENDING',
    remarks VARCHAR(255),
    issued_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- SCHOLARSHIPS
-- ------------------------------------------------------------
CREATE TABLE scholarships (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    provider VARCHAR(150),
    applied_date DATE,
    status ENUM('APPLIED','UNDER_REVIEW','APPROVED','REJECTED','DISBURSED') DEFAULT 'APPLIED',
    amount_sanctioned DECIMAL(10,2),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- MARKS
-- ------------------------------------------------------------
CREATE TABLE marks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    internal1 DECIMAL(5,2) DEFAULT 0,
    internal2 DECIMAL(5,2) DEFAULT 0,
    internal3 DECIMAL(5,2) DEFAULT 0,
    lab_marks DECIMAL(5,2) DEFAULT 0,
    assignment_marks DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(5,2) GENERATED ALWAYS AS (internal1 + internal2 + internal3 + lab_marks + assignment_marks) STORED,
    semester INT,
    academic_year VARCHAR(10),
    updated_by BIGINT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_marks (student_id, subject_id, semester, academic_year),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- COMPLAINTS
-- ------------------------------------------------------------
CREATE TABLE complaints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    category ENUM('ACADEMIC','MANAGEMENT') NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    -- Status flow
    status ENUM('SUBMITTED','IN_REVIEW','RESOLVED','CLOSED') DEFAULT 'SUBMITTED',
    assigned_to BIGINT,
    resolution TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- FACULTY NOTES
-- ------------------------------------------------------------
CREATE TABLE notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    faculty_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_url VARCHAR(255),
    lesson_number INT,
    ai_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- ------------------------------------------------------------
-- EVENTS (TEAM FINDER)
-- ------------------------------------------------------------
CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    creator_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category ENUM('HACKATHON','COMPETITION','PROJECT','WORKSHOP','OTHER') DEFAULT 'OTHER',
    team_size INT DEFAULT 4,
    required_skills TEXT,
    event_date DATE,
    registration_deadline DATE,
    is_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- EVENT APPLICATIONS
-- ------------------------------------------------------------
CREATE TABLE event_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,
    applicant_id BIGINT NOT NULL,
    message TEXT,
    status ENUM('PENDING','ACCEPTED','REJECTED') DEFAULT 'PENDING',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_event_app (event_id, applicant_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- PLACEMENTS / OPPORTUNITIES
-- ------------------------------------------------------------
CREATE TABLE opportunities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    posted_by BIGINT NOT NULL,
    type ENUM('PLACEMENT','INTERNSHIP','HACKATHON','SDP','OTHER') NOT NULL,
    company VARCHAR(150),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    eligibility TEXT,
    salary_package VARCHAR(50),
    location VARCHAR(100),
    apply_link VARCHAR(255),
    deadline DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id)
);

-- ------------------------------------------------------------
-- NOTIFICATIONS
-- ------------------------------------------------------------
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('INFO','SUCCESS','WARNING','ALERT') DEFAULT 'INFO',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO roles (name) VALUES ('STUDENT'), ('FACULTY'), ('ADMIN');

-- Admin user (password: Admin@123)
INSERT INTO users (name, email, password, role_id) VALUES
('System Admin', 'admin@sams.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3);

-- Department
INSERT INTO departments (name, code) VALUES ('Computer Science & Engineering', 'CSE');

-- Faculty users (password: Faculty@123)
INSERT INTO users (name, email, password, phone, role_id) VALUES
('Dr. Priya Sharma', 'priya.sharma@sams.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9876543210', 2),
('Prof. Ramesh Kumar', 'ramesh.kumar@sams.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9876543211', 2),
('Dr. Meena Iyer', 'meena.iyer@sams.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9876543212', 2);

-- Update HOD
UPDATE departments SET hod_id = 2 WHERE code = 'CSE';

-- Faculty profiles
INSERT INTO faculty_profiles (user_id, employee_id, department_id, designation) VALUES
(2, 'FAC001', 1, 'Associate Professor'),
(3, 'FAC002', 1, 'Assistant Professor'),
(4, 'FAC003', 1, 'Professor & HOD');

-- Class
INSERT INTO classes (name, section, year, department_id, incharge_id) VALUES
('III CSE', 'A', 3, 1, 2);

-- Student users (password: Student@123)
INSERT INTO users (name, email, password, phone, role_id) VALUES
('Arjun Patel', 'arjun.patel@sams.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9123456789', 1),
('Divya Krishnan', 'divya.k@sams.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9123456790', 1),
('Ravi Shankar', 'ravi.s@sams.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9123456791', 1);

-- Student profiles
INSERT INTO student_profiles (user_id, roll_number, class_id, department_id, batch, skills, interests, cgpa) VALUES
(5, '21CS001', 1, 1, '2021-2025', 'Java,React,Python', 'AI,Web Development', 8.5),
(6, '21CS002', 1, 1, '2021-2025', 'Python,ML,Django', 'Machine Learning,Data Science', 9.1),
(7, '21CS003', 1, 1, '2021-2025', 'C++,React,Node.js', 'Full Stack,Competitive Programming', 7.8);

-- Subjects
INSERT INTO subjects (name, code, credits, department_id, faculty_id, semester) VALUES
('Data Structures & Algorithms', 'CS301', 4, 1, 2, 5),
('Web Technologies', 'CS302', 3, 1, 3, 5),
('Database Management Systems', 'CS303', 3, 1, 4, 5),
('Machine Learning', 'CS304', 4, 1, 2, 5),
('Software Engineering', 'CS305', 3, 1, 3, 5);

-- Sample Attendance
INSERT INTO attendance (student_id, subject_id, date, status, marked_by) VALUES
(5, 1, CURDATE() - INTERVAL 1 DAY, 'PRESENT', 2),
(5, 2, CURDATE() - INTERVAL 1 DAY, 'PRESENT', 3),
(5, 3, CURDATE() - INTERVAL 1 DAY, 'ABSENT', 4),
(6, 1, CURDATE() - INTERVAL 1 DAY, 'PRESENT', 2),
(6, 2, CURDATE() - INTERVAL 1 DAY, 'PRESENT', 3),
(7, 1, CURDATE() - INTERVAL 1 DAY, 'ABSENT', 2);

-- Sample Marks
INSERT INTO marks (student_id, subject_id, internal1, internal2, internal3, lab_marks, assignment_marks, semester, academic_year, updated_by) VALUES
(5, 1, 42, 45, 44, 48, 18, 5, '2024-25', 2),
(5, 2, 38, 40, 41, 44, 17, 5, '2024-25', 3),
(6, 1, 48, 49, 47, 50, 20, 5, '2024-25', 2),
(7, 1, 35, 38, 36, 40, 15, 5, '2024-25', 2);

-- Sample Opportunities
INSERT INTO opportunities (posted_by, type, company, title, description, eligibility, salary_package, location, deadline) VALUES
(1, 'PLACEMENT', 'TCS', 'Software Engineer', 'Join TCS as a Software Engineer. Work on cutting-edge projects.', 'CGPA >= 7.0, CSE/IT branch', '3.5 LPA', 'Chennai', CURDATE() + INTERVAL 30 DAY),
(1, 'INTERNSHIP', 'Infosys', 'Summer Internship 2025', 'Internship in full-stack development team.', 'CGPA >= 6.5', '15000/month', 'Bangalore', CURDATE() + INTERVAL 15 DAY),
(1, 'HACKATHON', 'Smart India Hackathon', 'SIH 2025', 'National level hackathon for students.', 'All branches', '1 Lakh prize', 'Online', CURDATE() + INTERVAL 45 DAY),
(1, 'SDP', 'NPTEL', 'Python for Data Science', 'NPTEL certification course on Python and Data Science.', 'All students', 'Free', 'Online', CURDATE() + INTERVAL 60 DAY);

-- Sample Notifications
INSERT INTO notifications (user_id, title, message, type) VALUES
(5, 'Attendance Alert', 'Your attendance in DBMS is below 75%. Please attend classes regularly.', 'WARNING'),
(5, 'New Notes Available', 'Prof. Ramesh has uploaded notes for Web Technologies - Lesson 5.', 'INFO'),
(5, 'Leave Approved', 'Your leave application for 15-Jun-2025 has been approved by Class Incharge.', 'SUCCESS'),
(6, 'New Opportunity', 'TCS campus placement drive announced. Check Placements section.', 'INFO');
