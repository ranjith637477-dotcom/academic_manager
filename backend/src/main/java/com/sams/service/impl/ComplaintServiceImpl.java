package com.sams.service.impl;

import com.sams.dto.request.ComplaintRequest;
import com.sams.entity.Complaint;
import com.sams.entity.User;
import com.sams.enums.ComplaintCategory;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ComplaintRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ComplaintServiceImpl {
    private final ComplaintRepository complaintRepo;
    private final UserRepository userRepo;

    public ComplaintServiceImpl(ComplaintRepository complaintRepo, UserRepository userRepo) {
        this.complaintRepo = complaintRepo; this.userRepo = userRepo;
    }

    public Complaint submit(Long studentId, ComplaintRequest req) {
        User student = userRepo.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        return complaintRepo.save(Complaint.builder().student(student)
                .category(ComplaintCategory.valueOf(req.getCategory().toUpperCase()))
                .subject(req.getSubject()).description(req.getDescription())
                .isAnonymous(req.getIsAnonymous()).build());
    }

    public List<Complaint> getMyComplaints(Long studentId) { return complaintRepo.findByStudentIdOrderByCreatedAtDesc(studentId); }
    public List<Complaint> getAllComplaints() { return complaintRepo.findAllByOrderByCreatedAtDesc(); }

    public Complaint updateStatus(Long id, String status, String resolution) {
        Complaint c = complaintRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));
        c.setStatus(status); c.setResolution(resolution);
        return complaintRepo.save(c);
    }
}
