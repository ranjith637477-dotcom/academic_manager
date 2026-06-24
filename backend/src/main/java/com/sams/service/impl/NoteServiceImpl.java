package com.sams.service.impl;

import com.sams.dto.request.NoteRequest;
import com.sams.entity.Note;
import com.sams.entity.Subject;
import com.sams.entity.User;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.NoteRepository;
import com.sams.repository.SubjectRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteServiceImpl {
    private final NoteRepository noteRepo;
    private final UserRepository userRepo;
    private final SubjectRepository subjectRepo;

    public NoteServiceImpl(NoteRepository noteRepo, UserRepository userRepo, SubjectRepository subjectRepo) {
        this.noteRepo = noteRepo; this.userRepo = userRepo; this.subjectRepo = subjectRepo;
    }

    public Note upload(Long facultyId, NoteRequest req, String fileUrl) {
        User faculty = userRepo.findById(facultyId).orElseThrow(() -> new ResourceNotFoundException("Faculty not found"));
        Subject subject = subjectRepo.findById(req.getSubjectId()).orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        String desc = req.getDescription();
        String summary = (desc == null || desc.length() < 100) ? desc : desc.substring(0, Math.min(200, desc.length())) + "... [AI Summary: Key concepts covered in this lesson.]";
        return noteRepo.save(Note.builder().faculty(faculty).subject(subject).title(req.getTitle())
                .description(desc).fileUrl(fileUrl).lessonNumber(req.getLessonNumber()).aiSummary(summary).build());
    }

    public List<Note> getAllNotes() { return noteRepo.findAllByOrderByCreatedAtDesc(); }
    public List<Note> getNotesBySubject(Long subjectId) { return noteRepo.findBySubjectIdOrderByCreatedAtDesc(subjectId); }
}
