package com.sams.controller;
import com.sams.dto.request.LeaveRequest;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.LeaveServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/leave")
public class LeaveController {
    private final LeaveServiceImpl leaveService;
    public LeaveController(LeaveServiceImpl leaveService) { this.leaveService = leaveService; }

    @PostMapping("/apply") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> apply(@AuthenticationPrincipal User user, @Valid @RequestBody LeaveRequest req) {
        return ResponseEntity.ok(ApiResponse.success(leaveService.apply(user.getId(), req)));
    }
    @GetMapping("/my") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> my(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(leaveService.getMyApplications(user.getId())));
    }
    @GetMapping("/pending") @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> pending() {
        return ResponseEntity.ok(ApiResponse.success(leaveService.getPendingApplications()));
    }
    @PutMapping("/{id}/status") @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success(leaveService.updateStatus(id, body.get("level"), body.get("status"), body.get("remark"))));
    }
}
