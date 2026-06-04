package com.pfe.callmanagement.service;

import com.pfe.callmanagement.dto.ApplicationDTO;
import com.pfe.callmanagement.entity.Application;
import com.pfe.callmanagement.entity.CallForApplication;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.ApplicationRepository;
import com.pfe.callmanagement.repository.CallForApplicationRepository;
import com.pfe.callmanagement.repository.EvaluationRepository;
import com.pfe.callmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for application management operations.
 */
@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final CallForApplicationRepository callRepository;
    private final EvaluationRepository evaluationRepository;

    /**
     * Create a new application
     */
    public ApplicationDTO createApplication(ApplicationDTO dto) {
        User candidate = userRepository.findById(dto.getCandidateId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", dto.getCandidateId()));

        CallForApplication call = callRepository.findById(dto.getCallId())
            .orElseThrow(() -> new ResourceNotFoundException("Call", "id", dto.getCallId()));

        // Check if candidate already applied for this call
        Application existing = applicationRepository.findByCandidateAndCall(dto.getCandidateId(), dto.getCallId());
        if (existing != null) {
            throw new RuntimeException("Candidate already applied for this call");
        }

        Application application = new Application();
        application.setCandidate(candidate);
        application.setCallForApplication(call);
        application.setStatus("SUBMITTED");
        application.setSubmissionDate(LocalDateTime.now());

        Application savedApp = applicationRepository.save(application);
        return mapToDTO(savedApp);
    }

    /**
     * Get application by ID
     */
    public ApplicationDTO getApplicationById(Long applicationId) {
        Application app = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));
        return mapToDTO(app);
    }

    /**
     * Get all applications
     */
    public List<ApplicationDTO> getAllApplications() {
        return applicationRepository.findAll()
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get applications by status
     */
    public List<ApplicationDTO> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get applications from a candidate
     */
    public List<ApplicationDTO> getApplicationsByCandidate(Long candidateId) {
        return applicationRepository.findByCandidate_UserId(candidateId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get applications for a specific call
     */
    public List<ApplicationDTO> getApplicationsByCall(Long callId) {
        return applicationRepository.findByCallForApplication_CallId(callId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get applications by status and call
     */
    public List<ApplicationDTO> getApplicationsByStatusAndCall(String status, Long callId) {
        return applicationRepository.findByStatusAndCall(status, callId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Update application
     */
    public ApplicationDTO updateApplication(Long applicationId, ApplicationDTO dto) {
        Application app = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));

        app.setStatus(dto.getStatus());

        // Calculate final score if status is being updated
        if ("UNDER_REVIEW".equals(dto.getStatus()) || "ACCEPTED".equals(dto.getStatus())) {
            Double avgScore = evaluationRepository.getAverageScoreForApplication(applicationId);
            if (avgScore != null) {
                app.setFinalScore(avgScore);
            }
        }

        Application updatedApp = applicationRepository.save(app);
        return mapToDTO(updatedApp);
    }

    /**
     * Delete application
     */
    public void deleteApplication(Long applicationId) {
        if (!applicationRepository.existsById(applicationId)) {
            throw new ResourceNotFoundException("Application", "id", applicationId);
        }
        applicationRepository.deleteById(applicationId);
    }

    /**
     * Helper method to map entity to DTO
     */
    private ApplicationDTO mapToDTO(Application app) {
        return new ApplicationDTO(
            app.getApplicationId(),
            app.getSubmissionDate(),
            app.getStatus(),
            app.getFinalScore(),
            app.getCandidate().getUserId(),
            app.getCandidate().getEmail(),
            app.getCallForApplication().getCallId(),
            app.getCallForApplication().getTitle(),
            app.getCreatedAt(),
            app.getUpdatedAt()
        );
    }
}
