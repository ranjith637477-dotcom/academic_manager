package com.sams.service.impl;

import com.sams.entity.Attendance;
import com.sams.entity.Subject;
import com.sams.entity.User;
import com.sams.enums.AttendanceStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AttendanceRepository;
import com.sams.repository.SubjectRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceServiceImpl {
    private final AttendanceRepository attendanceRepo;
    private final UserRepository userRepo;
    private final SubjectRepository subjectRepo;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepo, UserRepository userRepo, SubjectRepository subjectRepo) {
        this.attendanceRepo = attendanceRepo; this.userRepo = userRepo; this.subjectRepo = subjectRepo;
    }

    public Attendance markAttendance(Long studentId, Long subjectId, LocalDate date, String status, Long markedById) {
        User student = userRepo.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Subject subject = subjectRepo.findById(subjectId).orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        User markedBy = userRepo.findById(markedById).orElseThrow(() -> new ResourceNotFoundException("Faculty not found"));
        Attendance att = attendanceRepo.findByStudentIdAndSubjectIdAndDate(studentId, subjectId, date)
                .orElse(Attendance.builder().student(student).subject(subject).date(date).markedBy(markedBy).build());
        att.setStatus(AttendanceStatus.valueOf(status));
        att.setMarkedBy(markedBy);
        return attendanceRepo.save(att);
    }

    public List<Attendance> getStudentAttendance(Long studentId) {
        return attendanceRepo.findByStudentIdOrderByDateDesc(studentId);
    }

    public Map<String, Object> getAttendanceStats(Long studentId, Long subjectId) {
        long present = attendanceRepo.countPresent(studentId, subjectId);
        long total = attendanceRepo.countTotal(studentId, subjectId);
        double percentage = total > 0 ? (present * 100.0 / total) : 0.0;
        Map<String, Object> stats = new HashMap<>();
        stats.put("present", present);
        stats.put("total", total);
        stats.put("percentage", Math.round(percentage * 10.0) / 10.0);
        return stats;
    }
}
