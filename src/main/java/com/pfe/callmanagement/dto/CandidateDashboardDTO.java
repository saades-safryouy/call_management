package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for candidate dashboard statistics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDashboardDTO {

    private Long totalApplications;

    private Long submittedApplications;

    private Long underReviewApplications;

    private Long acceptedApplications;

    private Long rejectedApplications;

    private Double averageScore;
}