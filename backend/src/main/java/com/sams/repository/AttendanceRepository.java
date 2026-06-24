package com.sams.repository;
import com.sams.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentIdOrderByDateDesc(Long studentId);
    List<Attendance> findBySubjectIdAndDate(Long subjectId, LocalDate date);
    Optional<Attendance> findByStudentIdAndSubjectIdAndDate(Long studentId, Long subjectId, LocalDate date);
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.id = :sid AND a.subject.id = :subId AND a.status = 'PRESENT'")
    long countPresent(@Param("sid") Long sid, @Param("subId") Long subId);
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.id = :sid AND a.subject.id = :subId")
    long countTotal(@Param("sid") Long sid, @Param("subId") Long subId);
}
