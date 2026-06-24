package com.sams.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity @Table(name = "student_profiles")
public class StudentProfile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false) private User user;
    @Column(name = "roll_number", unique = true, nullable = false) private String rollNumber;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "class_id") private Classes classes;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "department_id") private Department department;
    private String batch, skills, interests;
    private BigDecimal cgpa;

    public StudentProfile() {}
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public User getUser() { return user; } public void setUser(User u) { this.user = u; }
    public String getRollNumber() { return rollNumber; } public void setRollNumber(String r) { this.rollNumber = r; }
    public Classes getClasses() { return classes; } public void setClasses(Classes c) { this.classes = c; }
    public Department getDepartment() { return department; } public void setDepartment(Department d) { this.department = d; }
    public String getBatch() { return batch; } public void setBatch(String b) { this.batch = b; }
    public String getSkills() { return skills; } public void setSkills(String s) { this.skills = s; }
    public String getInterests() { return interests; } public void setInterests(String i) { this.interests = i; }
    public BigDecimal getCgpa() { return cgpa; } public void setCgpa(BigDecimal c) { this.cgpa = c; }
}
