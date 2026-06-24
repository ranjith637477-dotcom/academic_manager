package com.sams.controller;
import com.sams.dto.request.ComplaintRequest;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.ComplaintServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/complaints")
public class ComplaintController {
    private final ComplaintServiceImpl complaintService;
    public ComplaintController(ComplaintServiceImpl complaintService) { this.complaintService = complaintService; }

    @PostMapping @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> submit(@AuthenticationPrincipal User user, @Valid @RequestBody ComplaintRequest req) {
        return ResponseEntity.ok(ApiResponse.success(complaintService.submit(user.getId(), req)));
    }
    @GetMapping("/my") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> my(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(complaintService.getMyComplaints(user.getId())));
    }
    @GetMapping @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> all() {
        return ResponseEntity.ok(ApiResponse.success(complaintService.getAllComplaints()));
    }
    @PutMapping("/{id}/status") @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success(complaintService.updateStatus(id, body.get("status"), body.get("resolution"))));
    }
}
