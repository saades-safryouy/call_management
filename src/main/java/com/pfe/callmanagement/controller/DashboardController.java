package com.pfe.callmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.callmanagement.dto.DashboardDTO;
import com.pfe.callmanagement.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * Controller for dashboard statistics.
 */
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Dashboard statistics endpoints")
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Get dashboard statistics.
     */
    @GetMapping("/statistics")
    @Operation(
        summary = "Get dashboard statistics",
        description = "Retrieve overall statistics for the system"
    )
    public ResponseEntity<DashboardDTO> getStatistics() {

        DashboardDTO response = dashboardService.getStatistics();

        return ResponseEntity.ok(response);
    }
}