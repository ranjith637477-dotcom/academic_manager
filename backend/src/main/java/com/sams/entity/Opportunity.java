package com.sams.entity;
import com.sams.enums.OpportunityType;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "opportunities")
public class Opportunity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "posted_by") private User postedBy;
    @Enumerated(EnumType.STRING) private OpportunityType type;
    private String company, title, eligibility, salaryPackage, location, applyLink;
    @Column(columnDefinition = "TEXT") private String description;
    private LocalDate deadline;
    private Boolean isActive = true;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Opportunity() {}
    public Long getId() { return id; }
    public User getPostedBy() { return postedBy; } public void setPostedBy(User u) { this.postedBy = u; }
    public OpportunityType getType() { return type; } public void setType(OpportunityType t) { this.type = t; }
    public String getCompany() { return company; } public void setCompany(String c) { this.company = c; }
    public String getTitle() { return title; } public void setTitle(String t) { this.title = t; }
    public String getDescription() { return description; } public void setDescription(String d) { this.description = d; }
    public String getEligibility() { return eligibility; } public void setEligibility(String e) { this.eligibility = e; }
    public String getSalaryPackage() { return salaryPackage; } public void setSalaryPackage(String s) { this.salaryPackage = s; }
    public String getLocation() { return location; } public void setLocation(String l) { this.location = l; }
    public String getApplyLink() { return applyLink; } public void setApplyLink(String a) { this.applyLink = a; }
    public LocalDate getDeadline() { return deadline; } public void setDeadline(LocalDate d) { this.deadline = d; }
    public Boolean getIsActive() { return isActive; } public void setIsActive(Boolean a) { this.isActive = a; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User postedBy; private OpportunityType type; private String company, title, description, eligibility, salaryPackage, location, applyLink;
        private LocalDate deadline;
        public Builder postedBy(User u) { this.postedBy = u; return this; }
        public Builder type(OpportunityType t) { this.type = t; return this; }
        public Builder company(String c) { this.company = c; return this; }
        public Builder title(String t) { this.title = t; return this; }
        public Builder description(String d) { this.description = d; return this; }
        public Builder eligibility(String e) { this.eligibility = e; return this; }
        public Builder salaryPackage(String s) { this.salaryPackage = s; return this; }
        public Builder location(String l) { this.location = l; return this; }
        public Builder applyLink(String a) { this.applyLink = a; return this; }
        public Builder deadline(LocalDate d) { this.deadline = d; return this; }
        public Opportunity build() {
            Opportunity o = new Opportunity(); o.postedBy = postedBy; o.type = type; o.company = company;
            o.title = title; o.description = description; o.eligibility = eligibility;
            o.salaryPackage = salaryPackage; o.location = location; o.applyLink = applyLink; o.deadline = deadline; return o;
        }
    }
}
