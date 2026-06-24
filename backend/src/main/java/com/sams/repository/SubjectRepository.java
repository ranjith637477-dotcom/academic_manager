package com.sams.repository;
import com.sams.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByDepartmentId(Long deptId);
    List<Subject> findByFacultyId(Long facultyId);
}
