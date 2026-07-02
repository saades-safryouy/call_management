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
@RequestMapping("/applications")
@RequiredArgsConstructor
@Tag(name = "Applications", description = "Application management endpoints")
public class ApplicationController {

    private final ApplicationService applicationService;

    /**
     * Submit a new application
     */
    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "Submit application", description = "Candidate submits an application to a call")
    public ResponseEntity<ApplicationDTO> createApplication(
            @Valid @RequestBody ApplicationDTO dto) {

        ApplicationDTO response = applicationService.createApplication(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get application by ID
     */
    @GetMapping("/{applicationId}")
    @Operation(summary = "Get application by ID")
    public ResponseEntity<ApplicationDTO> getApplicationById(
            @PathVariable Long applicationId) {

        return ResponseEntity.ok(
                applicationService.getApplicationById(applicationId));
    }

    /**
     * Get all applications
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','HR')")
    @Operation(summary = "Get all applications")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {

        return ResponseEntity.ok(
                applicationService.getAllApplications());
    }

    /**
     * Get applications by status
     */
    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','HR')")
    @Operation(summary = "Get applications by status")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByStatus(status));
    }

    /**
     * Get applications by candidate
     */
    @GetMapping("/candidate/{candidateId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','HR','CANDIDATE')")
    @Operation(summary = "Get applications by candidate")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByCandidate(
            @PathVariable Long candidateId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByCandidate(candidateId));
    }

    /**
     * Get applications by call
     */
    @GetMapping("/call/{callId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','HR')")
    @Operation(summary = "Get applications by call")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByCall(
            @PathVariable Long callId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByCall(callId));
    }

    /**
     * Get applications by status and call
     */
    @GetMapping("/call/{callId}/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','HR')")
    @Operation(summary = "Get applications by status and call")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByStatusAndCall(
            @PathVariable Long callId,
            @PathVariable String status) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByStatusAndCall(status, callId));
    }

    /**
     * Update application
     */
    @PutMapping("/{applicationId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','HR')")
    @Operation(summary = "Update application")
    public ResponseEntity<ApplicationDTO> updateApplication(
            @PathVariable Long applicationId,
            @Valid @RequestBody ApplicationDTO dto) {

        return ResponseEntity.ok(
                applicationService.updateApplication(applicationId, dto));
    }

    /**
     * Delete application
     */
    @DeleteMapping("/{applicationId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete application")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long applicationId) {

        applicationService.deleteApplication(applicationId);
        return ResponseEntity.noContent().build();
    }
}