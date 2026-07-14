package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

/**
 * DTO for Application creation/update request and response.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDTO {

    private Long applicationId;

    private LocalDateTime submissionDate;

    private String status;

    private Double finalScore;

    @NotNull(message = "Candidate ID is required")
    private Long candidateId;

    private String candidateEmail;

    @NotNull(message = "Call ID is required")
    private Long callId;

    private String callTitle;

    private Long evaluatorId;

    private String evaluatorFirstName;

    private String evaluatorLastName;

    private String evaluatorEmail;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
