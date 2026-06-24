package com.sams.service.impl;

import com.sams.dto.request.LeaveRequest;
import com.sams.entity.LeaveApplication;
import com.sams.entity.User;
import com.sams.enums.LeaveStatus;
import com.sams.enums.LeaveType;
import com.sams.exception.BadRequestException;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LeaveApplicationRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeaveServiceImpl {
    private final LeaveApplicationRepository leaveRepo;
    private final UserRepository userRepo;

    public LeaveServiceImpl(LeaveApplicationRepository leaveRepo, UserRepository userRepo) {
        this.leaveRepo = leaveRepo; this.userRepo = userRepo;
    }

    public LeaveApplication apply(Long studentId, LeaveRequest req) {
        if (req.getType().equals("OD") && !req.getFromDate().isAfter(LocalDate.now()))
            throw new BadRequestException("OD must be applied at least 1 day before the event");
        User student = userRepo.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        LeaveApplication app = LeaveApplication.builder()
                .student(student).type(LeaveType.valueOf(req.getType()))
                .fromDate(req.getFromDate()).toDate(req.getToDate())
                .reason(req.getReason()).eventName(req.getEventName()).build();
        return leaveRepo.save(app);
    }

    public List<LeaveApplication> getMyApplications(Long studentId) { return leaveRepo.findByStudentIdOrderByCreatedAtDesc(studentId); }
    public List<LeaveApplication> getPendingApplications() { return leaveRepo.findByFinalStatus(LeaveStatus.PENDING); }

    public LeaveApplication updateStatus(Long id, String level, String status, String remark) {
        LeaveApplication app = leaveRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        LeaveStatus ls = LeaveStatus.valueOf(status.toUpperCase());
        switch (level.toLowerCase()) {
            case "incharge" -> {
                app.setInchargeStatus(ls); app.setInchargeRemark(remark); app.setInchargeAt(LocalDateTime.now());
                if (ls == LeaveStatus.REJECTED) app.setFinalStatus(LeaveStatus.REJECTED);
                else if (app.getType() == LeaveType.LEAVE) app.setFinalStatus(LeaveStatus.APPROVED);
            }
            case "hod" -> {
                app.setHodStatus(ls); app.setHodRemark(remark); app.setHodAt(LocalDateTime.now());
                if (ls == LeaveStatus.REJECTED) app.setFinalStatus(LeaveStatus.REJECTED);
            }
            case "coordinator" -> {
                app.setCoordinatorStatus(ls); app.setCoordinatorRemark(remark); app.setCoordinatorAt(LocalDateTime.now());
                app.setFinalStatus(ls);
            }
        }
        return leaveRepo.save(app);
    }
}
