package com.sams.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name = "notifications")
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id") private User user;
    @Column(nullable = false) private String title;
    @Column(columnDefinition = "TEXT", nullable = false) private String message;
    private String type = "INFO";
    private Boolean isRead = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Notification() {}
    public Long getId() { return id; }
    public User getUser() { return user; } public void setUser(User u) { this.user = u; }
    public String getTitle() { return title; } public void setTitle(String t) { this.title = t; }
    public String getMessage() { return message; } public void setMessage(String m) { this.message = m; }
    public String getType() { return type; } public void setType(String t) { this.type = t; }
    public Boolean getIsRead() { return isRead; } public void setIsRead(Boolean r) { this.isRead = r; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User user; private String title, message, type = "INFO";
        public Builder user(User u) { this.user = u; return this; }
        public Builder title(String t) { this.title = t; return this; }
        public Builder message(String m) { this.message = m; return this; }
        public Builder type(String t) { this.type = t; return this; }
        public Notification build() {
            Notification n = new Notification(); n.user = user; n.title = title; n.message = message; n.type = type; return n;
        }
    }
}
