package com.pfe.callmanagement.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.pfe.callmanagement.dto.EvaluationDTO;
import com.pfe.callmanagement.entity.Application;
import com.pfe.callmanagement.entity.Evaluation;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.ApplicationRepository;
import com.pfe.callmanagement.repository.EvaluationRepository;
import com.pfe.callmanagement.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service for evaluation management operations.
 */
@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    /**
     * Create a new evaluation
     */
    public EvaluationDTO createEvaluation(EvaluationDTO dto) {
        Application application = applicationRepository.findById(dto.getApplicationId())
            .orElseThrow(() -> new ResourceNotFoundException("Application", "id", dto.getApplicationId()));

        User evaluator = userRepository.findById(dto.getEvaluatorId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", dto.getEvaluatorId()));

          if (evaluationRepository.findByApplication_ApplicationIdAndEvaluator_UserId(
                dto.getApplicationId(),
                dto.getEvaluatorId()).isPresent()) {
                
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You have already evaluated this application.");
        }

        if (application.getEvaluator() == null || !application.getEvaluator().getUserId().equals(evaluator.getUserId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You have already evaluated this application.");
}

        Evaluation evaluation = new Evaluation();
        evaluation.setScore(dto.getScore());
        evaluation.setComment(dto.getComment());
        evaluation.setApplication(application);
        evaluation.setEvaluator(evaluator);

        if (dto.getEvaluationDate() != null) {
            evaluation.setEvaluationDate(dto.getEvaluationDate());
        }

        Evaluation savedEval = evaluationRepository.save(evaluation);

        // Calculate the average score
        Double averageScore = evaluationRepository.getAverageScoreForApplication(
                application.getApplicationId());

        application.setFinalScore(averageScore);
        applicationRepository.save(application);

        return mapToDTO(savedEval);
    }

    /**
     * Get evaluation by ID
     */
    public EvaluationDTO getEvaluationById(Long evaluationId) {
        Evaluation eval = evaluationRepository.findById(evaluationId)
            .orElseThrow(() -> new ResourceNotFoundException("Evaluation", "id", evaluationId));
        return mapToDTO(eval);
    }

    /**
     * Get evaluations for an application
     */
    public List<EvaluationDTO> getEvaluationsByApplication(Long applicationId) {
        return evaluationRepository.findByApplication_ApplicationId(applicationId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get evaluations by evaluator
     */
    public List<EvaluationDTO> getEvaluationsByEvaluator(Long evaluatorId) {
        return evaluationRepository.findByEvaluator_UserId(evaluatorId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get average score for an application
     */
    public Double getAverageScore(Long applicationId) {
        Double average = evaluationRepository.getAverageScoreForApplication(applicationId);
        return average != null ? average : 0.0;
    }

    /**
     * Update evaluation
     */
    public EvaluationDTO updateEvaluation(Long evaluationId, EvaluationDTO dto) {
        Evaluation eval = evaluationRepository.findById(evaluationId)
            .orElseThrow(() -> new ResourceNotFoundException("Evaluation", "id", evaluationId));

        eval.setScore(dto.getScore());
        eval.setComment(dto.getComment());

        Evaluation updatedEval = evaluationRepository.save(eval);
        return mapToDTO(updatedEval);
    }

    /**
     * Delete evaluation
     */
    public void deleteEvaluation(Long evaluationId) {
        if (!evaluationRepository.existsById(evaluationId)) {
            throw new ResourceNotFoundException("Evaluation", "id", evaluationId);
        }
        evaluationRepository.deleteById(evaluationId);
    }

    /**
     * Helper method to map entity to DTO
     */
    private EvaluationDTO mapToDTO(Evaluation eval) {
        return new EvaluationDTO(
            eval.getEvaluationId(),
            eval.getScore(),
            eval.getComment(),
            eval.getEvaluationDate(),
            eval.getApplication().getApplicationId(),
            eval.getEvaluator().getUserId(),
            eval.getEvaluator().getEmail(),
            eval.getCreatedAt()
        );
    }
}
