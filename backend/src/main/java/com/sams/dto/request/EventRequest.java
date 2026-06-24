package com.sams.dto.request;
import java.time.LocalDate;
public class EventRequest {
    private String title, description, category, requiredSkills;
    private Integer teamSize;
    private LocalDate eventDate, registrationDeadline;
    public String getTitle() { return title; } public void setTitle(String t) { this.title = t; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public String getCategory() { return category; } public void setCategory(String c) { this.category = c; }
    public String getRequiredSkills() { return requiredSkills; } public void setRequiredSkills(String s) { this.requiredSkills = s; }
    public Integer getTeamSize() { return teamSize; } public void setTeamSize(Integer t) { this.teamSize = t; }
    public LocalDate getEventDate() { return eventDate; } public void setEventDate(LocalDate d) { this.eventDate = d; }
    public LocalDate getRegistrationDeadline() { return registrationDeadline; } public void setRegistrationDeadline(LocalDate d) { this.registrationDeadline = d; }
}
