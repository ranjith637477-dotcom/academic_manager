package com.sams.entity;
import com.sams.enums.CertificateType;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name = "certificate_requests")
public class CertificateRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id") private User student;
    @Enumerated(EnumType.STRING) private CertificateType type;
    @Column(columnDefinition = "TEXT") private String reason;
    private String status = "PENDING", remarks, issuedUrl;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public CertificateRequest() {}
    public Long getId() { return id; }
    public User getStudent() { return student; } public void setStudent(User u) { this.student = u; }
    public CertificateType getType() { return type; } public void setType(CertificateType t) { this.type = t; }
    public String getReason() { return reason; } public void setReason(String r) { this.reason = r; }
    public String getStatus() { return status; } public void setStatus(String s) { this.status = s; }
    public String getRemarks() { return remarks; } public void setRemarks(String r) { this.remarks = r; }
    public String getIssuedUrl() { return issuedUrl; } public void setIssuedUrl(String u) { this.issuedUrl = u; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; } public void setUpdatedAt(LocalDateTime t) { this.updatedAt = t; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User student; private CertificateType type; private String reason;
        public Builder student(User s) { this.student = s; return this; }
        public Builder type(CertificateType t) { this.type = t; return this; }
        public Builder reason(String r) { this.reason = r; return this; }
        public CertificateRequest build() {
            CertificateRequest c = new CertificateRequest(); c.student = student; c.type = type; c.reason = reason; return c;
        }
    }
}
