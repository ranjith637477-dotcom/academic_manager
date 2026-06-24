package com.sams.repository;
import com.sams.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findBySubjectIdOrderByCreatedAtDesc(Long subjectId);
    List<Note> findByFacultyIdOrderByCreatedAtDesc(Long facultyId);
    List<Note> findAllByOrderByCreatedAtDesc();
}
