package com.sams.controller;
import com.sams.dto.request.EventRequest;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.EventServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/events")
public class EventController {
    private final EventServiceImpl eventService;
    public EventController(EventServiceImpl eventService) { this.eventService = eventService; }

    @GetMapping public ResponseEntity<ApiResponse<?>> all() { return ResponseEntity.ok(ApiResponse.success(eventService.getOpenEvents())); }
    @GetMapping("/my") @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> my(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(eventService.getMyEvents(user.getId())));
    }
    @PostMapping @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<?>> create(@AuthenticationPrincipal User user, @RequestBody EventRequest req) {
        return ResponseEntity.ok(ApiResponse.success(eventService.create(user.getId(), req)));
    }
}
