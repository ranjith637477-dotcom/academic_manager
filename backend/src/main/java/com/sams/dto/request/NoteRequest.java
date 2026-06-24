package com.sams.dto.request;
public class NoteRequest {
    private Long subjectId;
    private String title, description;
    private Integer lessonNumber;
    public Long getSubjectId() { return subjectId; } public void setSubjectId(Long v) { this.subjectId = v; }
    public String getTitle() { return title; } public void setTitle(String t) { this.title = t; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public Integer getLessonNumber() { return lessonNumber; } public void setLessonNumber(Integer n) { this.lessonNumber = n; }
}
