package com.sams.repository;
import com.sams.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByIsOpenTrueOrderByCreatedAtDesc();
    List<Event> findByCreatorIdOrderByCreatedAtDesc(Long creatorId);
}
