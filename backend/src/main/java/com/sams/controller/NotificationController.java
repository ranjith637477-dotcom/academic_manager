package com.sams.controller;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.NotificationServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationServiceImpl notifService;
    public NotificationController(NotificationServiceImpl notifService) { this.notifService = notifService; }

    @GetMapping public ResponseEntity<ApiResponse<?>> my(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(notifService.getMyNotifications(user.getId())));
    }
    @GetMapping("/unread-count") public ResponseEntity<ApiResponse<?>> unread(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(notifService.getUnreadCount(user.getId())));
    }
    @PutMapping("/{id}/read") public ResponseEntity<ApiResponse<?>> markRead(@PathVariable Long id) {
        notifService.markRead(id);
        return ResponseEntity.ok(ApiResponse.success("Marked as read", null));
    }
}
