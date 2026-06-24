package com.sams.service.impl;

import com.sams.dto.request.MarksRequest;
import com.sams.entity.Marks;
import com.sams.entity.Subject;
import com.sams.entity.User;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MarksRepository;
import com.sams.repository.SubjectRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MarksServiceImpl {
    private final MarksRepository marksRepo;
    private final UserRepository userRepo;
    private final SubjectRepository subjectRepo;

    public MarksServiceImpl(MarksRepository marksRepo, UserRepository userRepo, SubjectRepository subjectRepo) {
        this.marksRepo = marksRepo; this.userRepo = userRepo; this.subjectRepo = subjectRepo;
    }

    public Marks saveOrUpdate(Long facultyId, MarksRequest req) {
        User student = userRepo.findById(req.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Subject subject = subjectRepo.findById(req.getSubjectId()).orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        User faculty = userRepo.findById(facultyId).orElseThrow(() -> new ResourceNotFoundException("Faculty not found"));
        Marks marks = marksRepo.findByStudentIdAndSubjectIdAndSemesterAndAcademicYear(
                req.getStudentId(), req.getSubjectId(), req.getSemester(), req.getAcademicYear())
                .orElse(Marks.builder().student(student).subject(subject).semester(req.getSemester()).academicYear(req.getAcademicYear()).build());
        marks.setInternal1(req.getInternal1()); marks.setInternal2(req.getInternal2());
        marks.setInternal3(req.getInternal3()); marks.setLabMarks(req.getLabMarks());
        marks.setAssignmentMarks(req.getAssignmentMarks()); marks.setUpdatedBy(faculty);
        return marksRepo.save(marks);
    }

    public List<Marks> getStudentMarks(Long studentId) { return marksRepo.findByStudentId(studentId); }
}
