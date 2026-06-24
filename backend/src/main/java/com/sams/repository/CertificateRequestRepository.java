package com.sams.repository;
import com.sams.entity.CertificateRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CertificateRequestRepository extends JpaRepository<CertificateRequest, Long> {
    List<CertificateRequest> findByStudentIdOrderByCreatedAtDesc(Long studentId);
}
