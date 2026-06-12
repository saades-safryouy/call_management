package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

/**
 * DTO for CallForApplication creation/update request.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CallForApplicationDTO {

    private Long callId;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Opening date is required")
    private LocalDateTime openingDate;

    @NotNull(message = "Closing date is required")
    private LocalDateTime closingDate;

    private String status;

    private Long createdById;

    private String createdByEmail;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
