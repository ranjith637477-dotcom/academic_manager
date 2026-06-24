package com.sams.entity;
import com.sams.enums.LeaveStatus;
import com.sams.enums.LeaveType;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "leave_applications")
public class LeaveApplication {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id") private User student;
    @Enumerated(EnumType.STRING) private LeaveType type;
    private LocalDate fromDate, toDate;
    @Column(columnDefinition = "TEXT") private String reason;
    private String eventName, documentUrl;
    @Enumerated(EnumType.STRING) private LeaveStatus inchargeStatus = LeaveStatus.PENDING;
    private String inchargeRemark;
    private LocalDateTime inchargeAt;
    @Enumerated(EnumType.STRING) private LeaveStatus hodStatus = LeaveStatus.PENDING;
    private String hodRemark;
    private LocalDateTime hodAt;
    @Enumerated(EnumType.STRING) private LeaveStatus coordinatorStatus = LeaveStatus.PENDING;
    private String coordinatorRemark;
    private LocalDateTime coordinatorAt;
    @Enumerated(EnumType.STRING) private LeaveStatus finalStatus = LeaveStatus.PENDING;
    private LocalDateTime createdAt = LocalDateTime.now();

    public LeaveApplication() {}
    public Long getId() { return id; }
    public User getStudent() { return student; } public void setStudent(User u) { this.student = u; }
    public LeaveType getType() { return type; } public void setType(LeaveType t) { this.type = t; }
    public LocalDate getFromDate() { return fromDate; } public void setFromDate(LocalDate d) { this.fromDate = d; }
    public LocalDate getToDate() { return toDate; } public void setToDate(LocalDate d) { this.toDate = d; }
    public String getReason() { return reason; } public void setReason(String r) { this.reason = r; }
    public String getEventName() { return eventName; } public void setEventName(String e) { this.eventName = e; }
    public String getDocumentUrl() { return documentUrl; } public void setDocumentUrl(String d) { this.documentUrl = d; }
    public LeaveStatus getInchargeStatus() { return inchargeStatus; } public void setInchargeStatus(LeaveStatus s) { this.inchargeStatus = s; }
    public String getInchargeRemark() { return inchargeRemark; } public void setInchargeRemark(String r) { this.inchargeRemark = r; }
    public LocalDateTime getInchargeAt() { return inchargeAt; } public void setInchargeAt(LocalDateTime t) { this.inchargeAt = t; }
    public LeaveStatus getHodStatus() { return hodStatus; } public void setHodStatus(LeaveStatus s) { this.hodStatus = s; }
    public String getHodRemark() { return hodRemark; } public void setHodRemark(String r) { this.hodRemark = r; }
    public LocalDateTime getHodAt() { return hodAt; } public void setHodAt(LocalDateTime t) { this.hodAt = t; }
    public LeaveStatus getCoordinatorStatus() { return coordinatorStatus; } public void setCoordinatorStatus(LeaveStatus s) { this.coordinatorStatus = s; }
    public String getCoordinatorRemark() { return coordinatorRemark; } public void setCoordinatorRemark(String r) { this.coordinatorRemark = r; }
    public LocalDateTime getCoordinatorAt() { return coordinatorAt; } public void setCoordinatorAt(LocalDateTime t) { this.coordinatorAt = t; }
    public LeaveStatus getFinalStatus() { return finalStatus; } public void setFinalStatus(LeaveStatus s) { this.finalStatus = s; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User student; private LeaveType type; private LocalDate fromDate, toDate;
        private String reason, eventName;
        public Builder student(User s) { this.student = s; return this; }
        public Builder type(LeaveType t) { this.type = t; return this; }
        public Builder fromDate(LocalDate d) { this.fromDate = d; return this; }
        public Builder toDate(LocalDate d) { this.toDate = d; return this; }
        public Builder reason(String r) { this.reason = r; return this; }
        public Builder eventName(String e) { this.eventName = e; return this; }
        public LeaveApplication build() {
            LeaveApplication a = new LeaveApplication();
            a.student = student; a.type = type; a.fromDate = fromDate; a.toDate = toDate;
            a.reason = reason; a.eventName = eventName; return a;
        }
    }
}
