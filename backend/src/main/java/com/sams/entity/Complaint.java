package com.sams.entity;
import com.sams.enums.ComplaintCategory;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name = "complaints")
public class Complaint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id") private User student;
    @Enumerated(EnumType.STRING) private ComplaintCategory category;
    private String subject;
    @Column(columnDefinition = "TEXT") private String description;
    private Boolean isAnonymous = false;
    private String status = "SUBMITTED";
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "assigned_to") private User assignedTo;
    @Column(columnDefinition = "TEXT") private String resolution;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Complaint() {}
    public Long getId() { return id; }
    public User getStudent() { return student; } public void setStudent(User u) { this.student = u; }
    public ComplaintCategory getCategory() { return category; } public void setCategory(ComplaintCategory c) { this.category = c; }
    public String getSubject() { return subject; } public void setSubject(String s) { this.subject = s; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public Boolean getIsAnonymous() { return isAnonymous; } public void setIsAnonymous(Boolean a) { this.isAnonymous = a; }
    public String getStatus() { return status; } public void setStatus(String s) { this.status = s; }
    public User getAssignedTo() { return assignedTo; } public void setAssignedTo(User u) { this.assignedTo = u; }
    public String getResolution() { return resolution; } public void setResolution(String r) { this.resolution = r; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; } public void setUpdatedAt(LocalDateTime t) { this.updatedAt = t; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User student; private ComplaintCategory category;
        private String subject, description; private Boolean isAnonymous = false;
        public Builder student(User s) { this.student = s; return this; }
        public Builder category(ComplaintCategory c) { this.category = c; return this; }
        public Builder subject(String s) { this.subject = s; return this; }
        public Builder description(String d) { this.description = d; return this; }
        public Builder isAnonymous(Boolean a) { this.isAnonymous = a; return this; }
        public Complaint build() {
            Complaint c = new Complaint(); c.student = student; c.category = category;
            c.subject = subject; c.description = description; c.isAnonymous = isAnonymous; return c;
        }
    }
}
