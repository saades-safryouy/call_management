package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO for Document creation/update request and response.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {

    private Long documentId;

    @NotBlank(message = "File name is required")
    private String fileName;

    private String fileType;

    @NotBlank(message = "File path is required")
    private String filePath;

    @NotNull(message = "Application ID is required")
    private Long applicationId;
}
