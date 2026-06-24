package com.sams.controller;
import com.sams.dto.request.OpportunityRequest;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.OpportunityServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/opportunities")
public class OpportunityController {
    private final OpportunityServiceImpl oppService;
    public OpportunityController(OpportunityServiceImpl oppService) { this.oppService = oppService; }

    @GetMapping public ResponseEntity<ApiResponse<?>> all() { return ResponseEntity.ok(ApiResponse.success(oppService.getAll())); }
    @GetMapping("/type/{type}") public ResponseEntity<ApiResponse<?>> byType(@PathVariable String type) {
        return ResponseEntity.ok(ApiResponse.success(oppService.getByType(type)));
    }
    @PostMapping @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> create(@AuthenticationPrincipal User user, @RequestBody OpportunityRequest req) {
        return ResponseEntity.ok(ApiResponse.success(oppService.create(user.getId(), req)));
    }
}
