package com.sams.service.impl;

import com.sams.dto.request.OpportunityRequest;
import com.sams.entity.Opportunity;
import com.sams.entity.User;
import com.sams.enums.OpportunityType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.OpportunityRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OpportunityServiceImpl {
    private final OpportunityRepository oppRepo;
    private final UserRepository userRepo;

    public OpportunityServiceImpl(OpportunityRepository oppRepo, UserRepository userRepo) {
        this.oppRepo = oppRepo; this.userRepo = userRepo;
    }

    public Opportunity create(Long adminId, OpportunityRequest req) {
        User admin = userRepo.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return oppRepo.save(Opportunity.builder().postedBy(admin)
                .type(OpportunityType.valueOf(req.getType().toUpperCase()))
                .company(req.getCompany()).title(req.getTitle()).description(req.getDescription())
                .eligibility(req.getEligibility()).salaryPackage(req.getSalaryPackage())
                .location(req.getLocation()).applyLink(req.getApplyLink()).deadline(req.getDeadline()).build());
    }

    public List<Opportunity> getAll() { return oppRepo.findByIsActiveTrueOrderByCreatedAtDesc(); }
    public List<Opportunity> getByType(String type) { return oppRepo.findByTypeAndIsActiveTrue(OpportunityType.valueOf(type.toUpperCase())); }
}
