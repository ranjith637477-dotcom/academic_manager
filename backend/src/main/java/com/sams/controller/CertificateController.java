package com.sams.controller;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.CertificateServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/certificates")
public class CertificateController {
    private final CertificateServiceImpl certService;
    public CertificateController(CertificateServiceImpl certService) { this.certService = certService; }

    @PostMapping("/apply") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> apply(@AuthenticationPrincipal User user, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success(certService.apply(user.getId(), body.get("type"), body.get("reason"))));
    }
    @GetMapping("/my") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> my(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(certService.getMyCertificates(user.getId())));
    }
    @GetMapping @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<ApiResponse<?>> all() { return ResponseEntity.ok(ApiResponse.success(certService.getAllCertificates())); }
    @PutMapping("/{id}/status") @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<ApiResponse<?>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success(certService.updateStatus(id, body.get("status"), body.get("remarks"))));
    }
}
