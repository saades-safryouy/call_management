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

import com.pfe.callmanagement.dto.ApplicationDTO;
import com.pfe.callmanagement.service.ApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Controller for application management endpoints.
 */
@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Tag(name = "Applications", description = "Application management endpoints")
public class ApplicationController {

    private final ApplicationService applicationService;

    /**
     * Create new application endpoint
     */
    @PostMapping
    @Operation(summary = "Submit application", description = "Submit a new application to a call")
    public ResponseEntity<ApplicationDTO> createApplication(@Valid @RequestBody ApplicationDTO dto) {
        ApplicationDTO response = applicationService.createApplication(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get application by ID endpoint
     */
    @GetMapping("/{applicationId}")
    @Operation(summary = "Get application by ID", description = "Retrieve application information by ID")
    public ResponseEntity<ApplicationDTO> getApplicationById(@PathVariable Long applicationId) {
        ApplicationDTO response = applicationService.getApplicationById(applicationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all applications endpoint
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get all applications", description = "Retrieve all applications (Admin/Manager only)")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> response = applicationService.getAllApplications();
        return ResponseEntity.ok(response);
    }

    /**
     * Get applications by status endpoint
     */
    @GetMapping("/status/{status}")
    @Operation(summary = "Get applications by status", description = "Retrieve applications filtered by status")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByStatus(@PathVariable String status) {
        List<ApplicationDTO> response = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(response);
    }

    /**
     * Get applications from a candidate endpoint
     */
    @GetMapping("/candidate/{candidateId}")
    @Operation(summary = "Get applications by candidate", description = "Retrieve all applications from a candidate")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByCandidate(@PathVariable Long candidateId) {
        List<ApplicationDTO> response = applicationService.getApplicationsByCandidate(candidateId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get applications for a call endpoint
     */
    @GetMapping("/call/{callId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get applications by call", description = "Retrieve all applications for a specific call")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByCall(@PathVariable Long callId) {
        List<ApplicationDTO> response = applicationService.getApplicationsByCall(callId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update application endpoint
     */
    @PutMapping("/{applicationId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Update application", description = "Update application status")
    public ResponseEntity<ApplicationDTO> updateApplication(@PathVariable Long applicationId, @Valid @RequestBody ApplicationDTO dto) {
        ApplicationDTO response = applicationService.updateApplication(applicationId, dto);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete application endpoint
     */
    @DeleteMapping("/{applicationId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete application", description = "Delete an application")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
        return ResponseEntity.noContent().build();
    }
}
