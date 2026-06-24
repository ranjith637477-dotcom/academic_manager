package com.sams.entity;
import com.sams.enums.AttendanceStatus;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "attendance")
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id") private User student;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "subject_id") private Subject subject;
    private LocalDate date;
    @Enumerated(EnumType.STRING) private AttendanceStatus status = AttendanceStatus.ABSENT;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "marked_by") private User markedBy;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Attendance() {}
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public User getStudent() { return student; } public void setStudent(User u) { this.student = u; }
    public Subject getSubject() { return subject; } public void setSubject(Subject s) { this.subject = s; }
    public LocalDate getDate() { return date; } public void setDate(LocalDate d) { this.date = d; }
    public AttendanceStatus getStatus() { return status; } public void setStatus(AttendanceStatus s) { this.status = s; }
    public User getMarkedBy() { return markedBy; } public void setMarkedBy(User u) { this.markedBy = u; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User student; private Subject subject; private LocalDate date;
        private AttendanceStatus status = AttendanceStatus.ABSENT; private User markedBy;
        public Builder student(User s) { this.student = s; return this; }
        public Builder subject(Subject s) { this.subject = s; return this; }
        public Builder date(LocalDate d) { this.date = d; return this; }
        public Builder status(AttendanceStatus s) { this.status = s; return this; }
        public Builder markedBy(User u) { this.markedBy = u; return this; }
        public Attendance build() {
            Attendance a = new Attendance(); a.student = student; a.subject = subject;
            a.date = date; a.status = status; a.markedBy = markedBy; return a;
        }
    }
}
