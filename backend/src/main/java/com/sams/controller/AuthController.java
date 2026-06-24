package com.sams.controller;
import com.sams.dto.request.LoginRequest;
import com.sams.dto.request.RegisterRequest;
import com.sams.dto.response.ApiResponse;
import com.sams.service.impl.AuthServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final AuthServiceImpl authService;
    public AuthController(AuthServiceImpl authService) { this.authService = authService; }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(req)));
    }
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(ApiResponse.success(authService.register(req), null));
    }
}
