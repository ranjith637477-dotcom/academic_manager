package com.sams.service.impl;

import com.sams.entity.CertificateRequest;
import com.sams.entity.User;
import com.sams.enums.CertificateType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CertificateRequestRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CertificateServiceImpl {
    private final CertificateRequestRepository certRepo;
    private final UserRepository userRepo;

    public CertificateServiceImpl(CertificateRequestRepository certRepo, UserRepository userRepo) {
        this.certRepo = certRepo; this.userRepo = userRepo;
    }

    public CertificateRequest apply(Long studentId, String type, String reason) {
        User student = userRepo.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        return certRepo.save(CertificateRequest.builder().student(student).type(CertificateType.valueOf(type.toUpperCase())).reason(reason).build());
    }

    public List<CertificateRequest> getMyCertificates(Long studentId) { return certRepo.findByStudentIdOrderByCreatedAtDesc(studentId); }
    public List<CertificateRequest> getAllCertificates() { return certRepo.findAll(); }

    public CertificateRequest updateStatus(Long id, String status, String remarks) {
        CertificateRequest c = certRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Certificate request not found"));
        c.setStatus(status); c.setRemarks(remarks);
        return certRepo.save(c);
    }
}
