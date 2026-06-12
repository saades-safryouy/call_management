package com.pfe.callmanagement.repository;

import com.pfe.callmanagement.entity.CallForApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository interface for CallForApplication entity.
 */
@Repository
public interface CallForApplicationRepository extends JpaRepository<CallForApplication, Long> {
    
    List<CallForApplication> findByStatus(String status);

    List<CallForApplication> findByCreatedBy_UserId(Long userId);

    @Query("SELECT c FROM CallForApplication c WHERE c.openingDate BETWEEN :startDate AND :endDate")
    List<CallForApplication> findOpeningsBetweenDates(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT c FROM CallForApplication c WHERE c.closingDate > :date")
    List<CallForApplication> findActiveOpenings(@Param("date") LocalDateTime date);
}
