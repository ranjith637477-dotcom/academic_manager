package com.sams.entity;
import jakarta.persistence.*;

@Entity @Table(name = "classes")
public class Classes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String name;
    private String section;
    private Integer year;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "department_id") private Department department;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "incharge_id") private User incharge;

    public Classes() {}
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getSection() { return section; } public void setSection(String s) { this.section = s; }
    public Integer getYear() { return year; } public void setYear(Integer year) { this.year = year; }
    public Department getDepartment() { return department; } public void setDepartment(Department d) { this.department = d; }
    public User getIncharge() { return incharge; } public void setIncharge(User u) { this.incharge = u; }
}
