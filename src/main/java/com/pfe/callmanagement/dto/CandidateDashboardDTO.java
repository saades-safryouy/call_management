package com.pfe.callmanagement.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateDashboardDTO {

    private Long totalApplications;
    private Long submittedApplications;
    private Long underReviewApplications;
    private Long acceptedApplications;
    private Long rejectedApplications;

    private Double averageScore;

    private List<ApplicationDTO> recentApplications;

    private List<CallForApplicationDTO> activeCalls;
}