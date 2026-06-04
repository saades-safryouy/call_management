package com.pfe.callmanagement.repository;

import com.pfe.callmanagement.entity.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Evaluation entity.
 */
@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    
    List<Evaluation> findByApplication_ApplicationId(Long applicationId);

    List<Evaluation> findByEvaluator_UserId(Long evaluatorId);

    @Query("SELECT AVG(e.score) FROM Evaluation e WHERE e.application.applicationId = :applicationId")
    Double getAverageScoreForApplication(@Param("applicationId") Long applicationId);

    @Query("SELECT e FROM Evaluation e WHERE e.application.callForApplication.callId = :callId")
    List<Evaluation> findByCall(@Param("callId") Long callId);
}
