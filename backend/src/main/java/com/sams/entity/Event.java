package com.sams.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "events")
public class Event {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "creator_id") private User creator;
    @Column(nullable = false) private String title;
    @Column(columnDefinition = "TEXT") private String description;
    private String category, requiredSkills;
    private Integer teamSize = 4;
    private LocalDate eventDate, registrationDeadline;
    private Boolean isOpen = true;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Event() {}
    public Long getId() { return id; }
    public User getCreator() { return creator; } public void setCreator(User u) { this.creator = u; }
    public String getTitle() { return title; } public void setTitle(String t) { this.title = t; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public String getCategory() { return category; } public void setCategory(String c) { this.category = c; }
    public String getRequiredSkills() { return requiredSkills; } public void setRequiredSkills(String s) { this.requiredSkills = s; }
    public Integer getTeamSize() { return teamSize; } public void setTeamSize(Integer t) { this.teamSize = t; }
    public LocalDate getEventDate() { return eventDate; } public void setEventDate(LocalDate d) { this.eventDate = d; }
    public LocalDate getRegistrationDeadline() { return registrationDeadline; } public void setRegistrationDeadline(LocalDate d) { this.registrationDeadline = d; }
    public Boolean getIsOpen() { return isOpen; } public void setIsOpen(Boolean o) { this.isOpen = o; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User creator; private String title, description, category, requiredSkills;
        private Integer teamSize = 4; private LocalDate eventDate, registrationDeadline;
        public Builder creator(User u) { this.creator = u; return this; }
        public Builder title(String t) { this.title = t; return this; }
        public Builder description(String d) { this.description = d; return this; }
        public Builder category(String c) { this.category = c; return this; }
        public Builder requiredSkills(String s) { this.requiredSkills = s; return this; }
        public Builder teamSize(Integer t) { this.teamSize = t; return this; }
        public Builder eventDate(LocalDate d) { this.eventDate = d; return this; }
        public Builder registrationDeadline(LocalDate d) { this.registrationDeadline = d; return this; }
        public Event build() {
            Event e = new Event(); e.creator = creator; e.title = title; e.description = description;
            e.category = category; e.requiredSkills = requiredSkills; e.teamSize = teamSize;
            e.eventDate = eventDate; e.registrationDeadline = registrationDeadline; return e;
        }
    }
}
