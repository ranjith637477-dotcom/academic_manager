package com.sams.entity;
import jakarta.persistence.*;

@Entity @Table(name = "departments")
public class Department {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false, unique = true) private String code;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "hod_id") private User hod;

    public Department() {}
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getCode() { return code; } public void setCode(String code) { this.code = code; }
    public User getHod() { return hod; } public void setHod(User hod) { this.hod = hod; }
}
