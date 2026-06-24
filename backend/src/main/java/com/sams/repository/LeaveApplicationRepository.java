package com.sams.repository;
import com.sams.entity.LeaveApplication;
import com.sams.enums.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {
    List<LeaveApplication> findByStudentIdOrderByCreatedAtDesc(Long studentId);
    List<LeaveApplication> findByFinalStatus(LeaveStatus status);
}
