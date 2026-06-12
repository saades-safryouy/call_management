package com.pfe.callmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.callmanagement.dto.EvaluationDTO;
import com.pfe.callmanagement.service.EvaluationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Controller for evaluation management endpoints.
 */
@RestController
@RequestMapping("/evaluations")
@RequiredArgsConstructor
@Tag(name = "Evaluations", description = "Evaluation management endpoints")
public class EvaluationController {

    private final EvaluationService evaluationService;

    /**
     * Create new evaluation endpoint
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EVALUATOR')")
    @Operation(summary = "Create evaluation", description = "Evaluate an application")
    public ResponseEntity<EvaluationDTO> createEvaluation(@Valid @RequestBody EvaluationDTO dto) {
        EvaluationDTO response = evaluationService.createEvaluation(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get evaluation by ID endpoint
     */
    @GetMapping("/{evaluationId}")
    @Operation(summary = "Get evaluation by ID", description = "Retrieve evaluation information by ID")
    public ResponseEntity<EvaluationDTO> getEvaluationById(@PathVariable Long evaluationId) {
        EvaluationDTO response = evaluationService.getEvaluationById(evaluationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get evaluations for application endpoint
     */
    @GetMapping("/application/{applicationId}")
    @Operation(summary = "Get evaluations by application", description = "Retrieve all evaluations for an application")
    public ResponseEntity<List<EvaluationDTO>> getEvaluationsByApplication(@PathVariable Long applicationId) {
        List<EvaluationDTO> response = evaluationService.getEvaluationsByApplication(applicationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get evaluations by evaluator endpoint
     */
    @GetMapping("/evaluator/{evaluatorId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get evaluations by evaluator", description = "Retrieve all evaluations from a specific evaluator")
    public ResponseEntity<List<EvaluationDTO>> getEvaluationsByEvaluator(@PathVariable Long evaluatorId) {
        List<EvaluationDTO> response = evaluationService.getEvaluationsByEvaluator(evaluatorId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get average score for application endpoint
     */
    @GetMapping("/application/{applicationId}/average-score")
    @Operation(summary = "Get average score", description = "Get the average evaluation score for an application")
    public ResponseEntity<Double> getAverageScore(@PathVariable Long applicationId) {
        Double response = evaluationService.getAverageScore(applicationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update evaluation endpoint
     */
    @PutMapping("/{evaluationId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EVALUATOR')")
    @Operation(summary = "Update evaluation", description = "Update an evaluation")
    public ResponseEntity<EvaluationDTO> updateEvaluation(@PathVariable Long evaluationId, @Valid @RequestBody EvaluationDTO dto) {
        EvaluationDTO response = evaluationService.updateEvaluation(evaluationId, dto);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete evaluation endpoint
     */
    @DeleteMapping("/{evaluationId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete evaluation", description = "Delete an evaluation")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long evaluationId) {
        evaluationService.deleteEvaluation(evaluationId);
        return ResponseEntity.noContent().build();
    }
}
