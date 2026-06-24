package com.sams.entity;
import jakarta.persistence.*;

@Entity @Table(name = "subjects")
public class Subject {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String name;
    @Column(unique = true, nullable = false) private String code;
    private Integer credits = 3;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "department_id") private Department department;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "faculty_id") private User faculty;
    private Integer semester;

    public Subject() {}
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getCode() { return code; } public void setCode(String code) { this.code = code; }
    public Integer getCredits() { return credits; } public void setCredits(Integer c) { this.credits = c; }
    public Department getDepartment() { return department; } public void setDepartment(Department d) { this.department = d; }
    public User getFaculty() { return faculty; } public void setFaculty(User u) { this.faculty = u; }
    public Integer getSemester() { return semester; } public void setSemester(Integer s) { this.semester = s; }
}
