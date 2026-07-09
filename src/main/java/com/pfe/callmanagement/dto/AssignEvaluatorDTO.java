package com.pfe.callmanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignEvaluatorDTO {

    @NotNull(message = "Evaluator ID is required")
    private Long evaluatorId;
}