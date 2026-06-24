package com.sams.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name = "notes")
public class Note {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "faculty_id") private User faculty;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "subject_id") private Subject subject;
    @Column(nullable = false) private String title;
    @Column(columnDefinition = "TEXT") private String description;
    private String fileUrl;
    private Integer lessonNumber;
    @Column(columnDefinition = "TEXT") private String aiSummary;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Note() {}
    public Long getId() { return id; }
    public User getFaculty() { return faculty; } public void setFaculty(User u) { this.faculty = u; }
    public Subject getSubject() { return subject; } public void setSubject(Subject s) { this.subject = s; }
    public String getTitle() { return title; } public void setTitle(String t) { this.title = t; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public String getFileUrl() { return fileUrl; } public void setFileUrl(String f) { this.fileUrl = f; }
    public Integer getLessonNumber() { return lessonNumber; } public void setLessonNumber(Integer n) { this.lessonNumber = n; }
    public String getAiSummary() { return aiSummary; } public void setAiSummary(String s) { this.aiSummary = s; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User faculty; private Subject subject; private String title, description, fileUrl, aiSummary;
        private Integer lessonNumber;
        public Builder faculty(User u) { this.faculty = u; return this; }
        public Builder subject(Subject s) { this.subject = s; return this; }
        public Builder title(String t) { this.title = t; return this; }
        public Builder description(String d) { this.description = d; return this; }
        public Builder fileUrl(String f) { this.fileUrl = f; return this; }
        public Builder lessonNumber(Integer n) { this.lessonNumber = n; return this; }
        public Builder aiSummary(String s) { this.aiSummary = s; return this; }
        public Note build() {
            Note n = new Note(); n.faculty = faculty; n.subject = subject; n.title = title;
            n.description = description; n.fileUrl = fileUrl; n.lessonNumber = lessonNumber; n.aiSummary = aiSummary; return n;
        }
    }
}
