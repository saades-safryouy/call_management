package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EvaluatorDashboardDTO {

    private long pendingEvaluations;
    private long completed;
    private long totalAssigned;
    private Double averageScore;

}