package com.pfe.callmanagement.repository;

import com.pfe.callmanagement.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Application entity.
 */
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    List<Application> findByStatus(String status);

    List<Application> findByCandidate_UserId(Long candidateId);

    List<Application> findByCallForApplication_CallId(Long callId);

    @Query("SELECT a FROM Application a WHERE a.candidate.userId = :candidateId AND a.callForApplication.callId = :callId")
    Application findByCandidateAndCall(@Param("candidateId") Long candidateId, @Param("callId") Long callId);

    @Query("SELECT a FROM Application a WHERE a.status = :status AND a.callForApplication.callId = :callId")
    List<Application> findByStatusAndCall(@Param("status") String status, @Param("callId") Long callId);
}
