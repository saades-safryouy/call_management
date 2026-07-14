package com.pfe.callmanagement.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.callmanagement.dto.ApplicationDTO;
import com.pfe.callmanagement.dto.CandidateDashboardDTO;
import com.pfe.callmanagement.service.CandidateService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/candidate")
@RequiredArgsConstructor
@Tag(name = "Candidate", description = "Candidate dashboard endpoints")
public class CandidateController {

    private final CandidateService candidateService;

    /**
     * Dashboard statistics for the authenticated candidate.
     */
    @GetMapping("/dashboard")
    public ResponseEntity<CandidateDashboardDTO> getDashboard() {
        return ResponseEntity.ok(candidateService.getDashboard());
    }

    /**
      * Get applications of the authenticated candidate
      */
    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDTO>> getMyApplications() {
        return ResponseEntity.ok(candidateService.getMyApplications());
    }

   

}