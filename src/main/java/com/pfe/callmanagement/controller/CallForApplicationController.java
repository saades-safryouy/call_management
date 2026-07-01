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

import com.pfe.callmanagement.dto.CallForApplicationDTO;
import com.pfe.callmanagement.service.CallForApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Controller for call for application management endpoints.
 */
@RestController
@RequestMapping("/calls")
@RequiredArgsConstructor
@Tag(name = "Calls for Application", description = "Call for application management endpoints")
public class CallForApplicationController {

    private final CallForApplicationService callService;

    /**
     * Create new call for application endpoint
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'MANAGER')")
    @Operation(summary = "Create call", description = "Create a new call for application")
    public ResponseEntity<CallForApplicationDTO> createCall(@Valid @RequestBody CallForApplicationDTO dto) {
        CallForApplicationDTO response = callService.createCall(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get call by ID endpoint
     */
    @GetMapping("/{callId}")
    @Operation(summary = "Get call by ID", description = "Retrieve call for application by ID")
    public ResponseEntity<CallForApplicationDTO> getCallById(@PathVariable Long callId) {
        CallForApplicationDTO response = callService.getCallById(callId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all calls endpoint
     */
    @GetMapping
    @Operation(summary = "Get all calls", description = "Retrieve all calls for application")
    public ResponseEntity<List<CallForApplicationDTO>> getAllCalls() {
        List<CallForApplicationDTO> response = callService.getAllCalls();
        return ResponseEntity.ok(response);
    }

    /**
     * Get calls by status endpoint
     */
    @GetMapping("/status/{status}")
    @Operation(summary = "Get calls by status", description = "Retrieve calls filtered by status")
    public ResponseEntity<List<CallForApplicationDTO>> getCallsByStatus(@PathVariable String status) {
        List<CallForApplicationDTO> response = callService.getCallsByStatus(status);
        return ResponseEntity.ok(response);
    }

    /**
     * Get active calls endpoint
     */
    @GetMapping("/active")
    @Operation(summary = "Get active calls", description = "Retrieve active calls (not yet closed)")
    public ResponseEntity<List<CallForApplicationDTO>> getActiveCalls() {
        List<CallForApplicationDTO> response = callService.getActiveCalls();
        return ResponseEntity.ok(response);
    }

    /**
     * Get calls created by user endpoint
     */
    @GetMapping("/creator/{userId}")
    @Operation(summary = "Get calls by creator", description = "Retrieve calls created by a specific user")
    public ResponseEntity<List<CallForApplicationDTO>> getCallsByCreator(@PathVariable Long userId) {
        List<CallForApplicationDTO> response = callService.getCallsByCreator(userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update call endpoint
     */
    @PutMapping("/{callId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'MANAGER')")
    @Operation(summary = "Update call", description = "Update call for application")
    public ResponseEntity<CallForApplicationDTO> updateCall(@PathVariable Long callId, @Valid @RequestBody CallForApplicationDTO dto) {
        CallForApplicationDTO response = callService.updateCall(callId, dto);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete call endpoint
     */
    @DeleteMapping("/{callId}")
    @PreAuthorize("hasRole('ADMIN', 'HR')")
    @Operation(summary = "Delete call", description = "Delete a call for application")
    public ResponseEntity<Void> deleteCall(@PathVariable Long callId) {
        callService.deleteCall(callId);
        return ResponseEntity.noContent().build();
    }
}
