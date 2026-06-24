package com.sams.repository;
import com.sams.entity.Opportunity;
import com.sams.enums.OpportunityType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
    List<Opportunity> findByIsActiveTrueOrderByCreatedAtDesc();
    List<Opportunity> findByTypeAndIsActiveTrue(OpportunityType type);
}
