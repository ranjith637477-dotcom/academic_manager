package com.sams.controller;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.AttendanceServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Map;

@RestController @RequestMapping("/api/attendance")
public class AttendanceController {
    private final AttendanceServiceImpl attendanceService;
    public AttendanceController(AttendanceServiceImpl attendanceService) { this.attendanceService = attendanceService; }

    @GetMapping("/my") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> getMyAttendance(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getStudentAttendance(user.getId())));
    }
    @GetMapping("/stats/{subjectId}") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> getStats(@AuthenticationPrincipal User user, @PathVariable Long subjectId) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getAttendanceStats(user.getId(), subjectId)));
    }
    @PostMapping("/mark") @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> mark(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Long studentId = Long.parseLong(body.get("studentId").toString());
        Long subjectId = Long.parseLong(body.get("subjectId").toString());
        LocalDate date = LocalDate.parse(body.get("date").toString());
        String status = body.get("status").toString();
        return ResponseEntity.ok(ApiResponse.success(attendanceService.markAttendance(studentId, subjectId, date, status, user.getId())));
    }
}
