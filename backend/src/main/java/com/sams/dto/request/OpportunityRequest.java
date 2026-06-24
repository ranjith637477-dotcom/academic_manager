package com.sams.dto.request;
import java.time.LocalDate;
public class OpportunityRequest {
    private String type, company, title, description, eligibility, salaryPackage, location, applyLink;
    private LocalDate deadline;
    public String getType() { return type; } public void setType(String t) { this.type = t; }
    public String getCompany() { return company; } public void setCompany(String c) { this.company = c; }
    public String getTitle() { return title; } public void setTitle(String t) { this.title = t; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public String getEligibility() { return eligibility; } public void setEligibility(String e) { this.eligibility = e; }
    public String getSalaryPackage() { return salaryPackage; } public void setSalaryPackage(String s) { this.salaryPackage = s; }
    public String getLocation() { return location; } public void setLocation(String l) { this.location = l; }
    public String getApplyLink() { return applyLink; } public void setApplyLink(String a) { this.applyLink = a; }
    public LocalDate getDeadline() { return deadline; } public void setDeadline(LocalDate d) { this.deadline = d; }
}
