package com.pfe.callmanagement.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for Evaluation creation/update request and response.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDTO {

    private Long evaluationId;

    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score must be at least 0")
    @Max(value = 100, message = "Score must not exceed 100")
    private Double score;

    private String comment;

    private LocalDateTime evaluationDate;

    @NotNull(message = "Application ID is required")
    private Long applicationId;

    @NotNull(message = "Evaluator ID is required")
    private Long evaluatorId;

    private String evaluatorEmail;

    private LocalDateTime createdAt;
}
