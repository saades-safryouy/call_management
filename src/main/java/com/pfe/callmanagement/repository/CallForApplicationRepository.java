package com.pfe.callmanagement.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pfe.callmanagement.entity.CallForApplication;

@Repository
public interface CallForApplicationRepository extends JpaRepository<CallForApplication, Long> {

    List<CallForApplication> findByStatus(String status);

    List<CallForApplication> findByCreatedBy_UserId(Long userId);

    List<CallForApplication> findByTitleContainingIgnoreCase(String title);
    
    List<CallForApplication> findByStatusOrderByClosingDateAsc(String status);
    
    long count();
    
    Long countByStatus(String status);

    @Query(" SELECT c FROM CallForApplication c WHERE c.openingDate BETWEEN :startDate AND :endDate ")
    List<CallForApplication> findOpeningsBetweenDates(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

    @Query("SELECT c FROM CallForApplication c WHERE c.status = 'OPEN' AND c.closingDate > :date ")
    List<CallForApplication> findActiveOpenings(
            @Param("date") LocalDateTime date);


    @Query("SELECT COUNT(c) FROM CallForApplication c WHERE c.closingDate < CURRENT_TIMESTAMP")
    long countExpiredCalls();
}