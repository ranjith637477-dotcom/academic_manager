package com.sams.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity @Table(name = "marks")
public class Marks {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id") private User student;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "subject_id") private Subject subject;
    private BigDecimal internal1 = BigDecimal.ZERO;
    private BigDecimal internal2 = BigDecimal.ZERO;
    private BigDecimal internal3 = BigDecimal.ZERO;
    private BigDecimal labMarks = BigDecimal.ZERO;
    private BigDecimal assignmentMarks = BigDecimal.ZERO;
    private Integer semester;
    private String academicYear;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "updated_by") private User updatedBy;
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Marks() {}
    public Long getId() { return id; }
    public User getStudent() { return student; } public void setStudent(User u) { this.student = u; }
    public Subject getSubject() { return subject; } public void setSubject(Subject s) { this.subject = s; }
    public BigDecimal getInternal1() { return internal1; } public void setInternal1(BigDecimal v) { this.internal1 = v; }
    public BigDecimal getInternal2() { return internal2; } public void setInternal2(BigDecimal v) { this.internal2 = v; }
    public BigDecimal getInternal3() { return internal3; } public void setInternal3(BigDecimal v) { this.internal3 = v; }
    public BigDecimal getLabMarks() { return labMarks; } public void setLabMarks(BigDecimal v) { this.labMarks = v; }
    public BigDecimal getAssignmentMarks() { return assignmentMarks; } public void setAssignmentMarks(BigDecimal v) { this.assignmentMarks = v; }
    public Integer getSemester() { return semester; } public void setSemester(Integer s) { this.semester = s; }
    public String getAcademicYear() { return academicYear; } public void setAcademicYear(String y) { this.academicYear = y; }
    public User getUpdatedBy() { return updatedBy; } public void setUpdatedBy(User u) { this.updatedBy = u; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public BigDecimal getTotal() { return internal1.add(internal2).add(internal3).add(labMarks).add(assignmentMarks); }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User student; private Subject subject; private Integer semester; private String academicYear;
        public Builder student(User s) { this.student = s; return this; }
        public Builder subject(Subject s) { this.subject = s; return this; }
        public Builder semester(Integer s) { this.semester = s; return this; }
        public Builder academicYear(String y) { this.academicYear = y; return this; }
        public Marks build() {
            Marks m = new Marks(); m.student = student; m.subject = subject;
            m.semester = semester; m.academicYear = academicYear; return m;
        }
    }
}
