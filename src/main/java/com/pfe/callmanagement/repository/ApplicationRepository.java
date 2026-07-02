package com.pfe.callmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pfe.callmanagement.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    /**
     * Find applications by status.
     */
    List<Application> findByStatus(String status);

    /**
     * Find applications submitted by a candidate.
     */
    List<Application> findByCandidate_UserId(Long candidateId);

    /**
     * Find applications for a call.
     */
    List<Application> findByCallForApplication_CallId(Long callId);

    /**
     * Check whether a candidate has already applied for a call.
     */
    Optional<Application> findByCandidate_UserIdAndCallForApplication_CallId(
            Long candidateId,
            Long callId
    );

    /**
     * Find applications by status for a specific call.
     */
    List<Application> findByStatusAndCallForApplication_CallId(
            String status,
            Long callId
    );

    /**
     * Count total applications of a candidate.
     */
    Long countByCandidate_UserId(Long candidateId);

    /**
     * Count applications by candidate and status.
     */
    Long countByCandidate_UserIdAndStatus(Long candidateId, String status);

    /**
     * Average score of a candidate.
     */
    @Query("""
            SELECT AVG(a.finalScore)
            FROM Application a
            WHERE a.candidate.userId = :candidateId
            """)
    Double getAverageScoreByCandidate(@Param("candidateId") Long candidateId);
}