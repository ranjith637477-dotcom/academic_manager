package com.sams.dto.request;
import java.math.BigDecimal;
public class MarksRequest {
    private Long studentId, subjectId;
    private BigDecimal internal1, internal2, internal3, labMarks, assignmentMarks;
    private Integer semester;
    private String academicYear;
    public Long getStudentId() { return studentId; } public void setStudentId(Long v) { this.studentId = v; }
    public Long getSubjectId() { return subjectId; } public void setSubjectId(Long v) { this.subjectId = v; }
    public BigDecimal getInternal1() { return internal1; } public void setInternal1(BigDecimal v) { this.internal1 = v; }
    public BigDecimal getInternal2() { return internal2; } public void setInternal2(BigDecimal v) { this.internal2 = v; }
    public BigDecimal getInternal3() { return internal3; } public void setInternal3(BigDecimal v) { this.internal3 = v; }
    public BigDecimal getLabMarks() { return labMarks; } public void setLabMarks(BigDecimal v) { this.labMarks = v; }
    public BigDecimal getAssignmentMarks() { return assignmentMarks; } public void setAssignmentMarks(BigDecimal v) { this.assignmentMarks = v; }
    public Integer getSemester() { return semester; } public void setSemester(Integer v) { this.semester = v; }
    public String getAcademicYear() { return academicYear; } public void setAcademicYear(String v) { this.academicYear = v; }
}
