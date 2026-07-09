package com.pfe.callmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.callmanagement.dto.DashboardDTO;
import com.pfe.callmanagement.service.DashboardService;
import org.springframework.security.core.Authentication;
import com.pfe.callmanagement.dto.EvaluatorDashboardDTO;
import org.springframework.web.bind.annotation.PathVariable;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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



    @GetMapping("/evaluator/{evaluatorId}")
    @Operation(summary = "Evaluator Dashboard")
    public ResponseEntity<EvaluatorDashboardDTO> getEvaluatorDashboard(
            @PathVariable Long evaluatorId) {

        return ResponseEntity.ok(
            dashboardService.getEvaluatorDashboard(evaluatorId));
    }
}

