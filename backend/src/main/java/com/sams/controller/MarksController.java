package com.sams.controller;
import com.sams.dto.request.MarksRequest;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.MarksServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/marks")
public class MarksController {
    private final MarksServiceImpl marksService;
    public MarksController(MarksServiceImpl marksService) { this.marksService = marksService; }

    @GetMapping("/my") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> my(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(marksService.getStudentMarks(user.getId())));
    }
    @PostMapping @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> save(@AuthenticationPrincipal User user, @RequestBody MarksRequest req) {
        return ResponseEntity.ok(ApiResponse.success(marksService.saveOrUpdate(user.getId(), req)));
    }
}
