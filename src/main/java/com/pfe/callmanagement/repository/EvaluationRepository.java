package com.pfe.callmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.pfe.callmanagement.entity.Evaluation;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

    List<Evaluation> findByApplication_ApplicationId(Long applicationId);

    List<Evaluation> findByEvaluator_UserId(Long evaluatorId);

    @Query("SELECT AVG(e.score) FROM Evaluation e WHERE e.application.applicationId = :applicationId")
    Double getAverageScoreForApplication(@Param("applicationId") Long applicationId);

    Optional<Evaluation> findByApplication_ApplicationIdAndEvaluator_UserId(
        Long applicationId,
        Long evaluatorId);

    List<Evaluation> findByApplication_CallForApplication_CallId(Long callId);
}