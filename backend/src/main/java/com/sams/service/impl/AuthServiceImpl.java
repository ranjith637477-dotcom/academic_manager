package com.sams.service.impl;

import com.sams.dto.request.LoginRequest;
import com.sams.dto.request.RegisterRequest;
import com.sams.dto.response.JwtResponse;
import com.sams.entity.Role;
import com.sams.entity.User;
import com.sams.enums.RoleName;
import com.sams.exception.BadRequestException;
import com.sams.repository.RoleRepository;
import com.sams.repository.UserRepository;
import com.sams.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl {
    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(AuthenticationManager authManager, UserRepository userRepo,
            RoleRepository roleRepo, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authManager = authManager; this.userRepo = userRepo; this.roleRepo = roleRepo;
        this.encoder = encoder; this.jwtUtils = jwtUtils;
    }

    public JwtResponse login(LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        User user = (User) auth.getPrincipal();
        String token = jwtUtils.generateToken(user);
        return new JwtResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().getName().name());
    }

    public String register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail()))
            throw new BadRequestException("Email already registered");
        RoleName roleName = RoleName.valueOf(req.getRoleName().toUpperCase());
        Role role = roleRepo.findByName(roleName)
                .orElseThrow(() -> new BadRequestException("Role not found"));
        User user = User.builder()
                .name(req.getName()).email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .phone(req.getPhone()).role(role).build();
        userRepo.save(user);
        return "User registered successfully";
    }
}
