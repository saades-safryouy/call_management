package com.pfe.callmanagement.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for dashboard statistics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {

   private long users;
private long calls;
private long applications;
private long evaluations;
private long documents;

private long submittedApplications;
private long underReviewApplications;
private long shortlistedApplications;
private long acceptedApplications;
private long rejectedApplications;

private long openCalls;
private long closedCalls;
private long draftCalls;

private List<ApplicationDTO> recentApplications;
}