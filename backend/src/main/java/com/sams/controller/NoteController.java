package com.sams.controller;
import com.sams.dto.request.NoteRequest;
import com.sams.dto.response.ApiResponse;
import com.sams.entity.User;
import com.sams.service.impl.NoteServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/notes")
public class NoteController {
    private final NoteServiceImpl noteService;
    public NoteController(NoteServiceImpl noteService) { this.noteService = noteService; }

    @PostMapping @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<ApiResponse<?>> upload(@AuthenticationPrincipal User user, @RequestBody NoteRequest req) {
        return ResponseEntity.ok(ApiResponse.success(noteService.upload(user.getId(), req, null)));
    }
    @GetMapping
    public ResponseEntity<ApiResponse<?>> all() { return ResponseEntity.ok(ApiResponse.success(noteService.getAllNotes())); }
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<ApiResponse<?>> bySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(ApiResponse.success(noteService.getNotesBySubject(subjectId)));
    }
}
