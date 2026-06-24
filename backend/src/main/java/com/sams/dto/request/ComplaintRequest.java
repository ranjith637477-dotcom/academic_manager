package com.sams.dto.request;
import jakarta.validation.constraints.NotBlank;
public class ComplaintRequest {
    @NotBlank private String category;
    @NotBlank private String subject;
    @NotBlank private String description;
    private Boolean isAnonymous = false;
    public String getCategory() { return category; } public void setCategory(String c) { this.category = c; }
    public String getSubject() { return subject; } public void setSubject(String s) { this.subject = s; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public Boolean getIsAnonymous() { return isAnonymous; } public void setIsAnonymous(Boolean a) { this.isAnonymous = a; }
}
