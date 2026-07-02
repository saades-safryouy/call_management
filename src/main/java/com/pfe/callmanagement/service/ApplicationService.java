package com.pfe.callmanagement.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

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
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User",
                                "id",
                                dto.getCandidateId()));

        CallForApplication call = callRepository.findById(dto.getCallId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Call",
                                "id",
                                dto.getCallId()));

        // Check duplicate application
        if (applicationRepository
                .findByCandidate_UserIdAndCallForApplication_CallId(
                        dto.getCandidateId(),
                        dto.getCallId())
                .isPresent()) {

            throw new IllegalStateException(
                    "Candidate has already applied for this call.");
        }

        // Check call status
        if (!"OPEN".equalsIgnoreCase(call.getStatus())) {
            throw new IllegalStateException(
                    "Applications are closed for this call.");
        }

        // Check deadline
        if (call.getClosingDate().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException(
                    "This call has already closed.");
        }

        Application application = new Application();

        application.setCandidate(candidate);
        application.setCallForApplication(call);
        application.setStatus("SUBMITTED");
        application.setSubmissionDate(LocalDateTime.now());

        Application savedApplication = applicationRepository.save(application);

        return mapToDTO(savedApplication);
    }

    /**
     * Get application by ID
     */
    public ApplicationDTO getApplicationById(Long applicationId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application",
                                "id",
                                applicationId));

        return mapToDTO(application);
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
     * Get applications by candidate
     */
    public List<ApplicationDTO> getApplicationsByCandidate(Long candidateId) {

        return applicationRepository.findByCandidate_UserId(candidateId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get applications by call
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
    public List<ApplicationDTO> getApplicationsByStatusAndCall(
            String status,
            Long callId) {

        return applicationRepository
                .findByStatusAndCallForApplication_CallId(status, callId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update application
     */
    public ApplicationDTO updateApplication(Long applicationId,
                                            ApplicationDTO dto) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application",
                                "id",
                                applicationId));

        List<String> allowedStatus = List.of(
                "SUBMITTED",
                "UNDER_REVIEW",
                "SHORTLISTED",
                "ACCEPTED",
                "REJECTED"
        );

        if (!allowedStatus.contains(dto.getStatus())) {
            throw new IllegalArgumentException("Invalid application status.");
        }

        application.setStatus(dto.getStatus());

        if ("UNDER_REVIEW".equals(dto.getStatus())
                || "ACCEPTED".equals(dto.getStatus())) {

            Double averageScore =
                    evaluationRepository.getAverageScoreForApplication(applicationId);

            if (averageScore != null) {
                application.setFinalScore(averageScore);
            }
        }

        Application updatedApplication =
                applicationRepository.save(application);

        return mapToDTO(updatedApplication);
    }

    /**
     * Delete application
     */
    public void deleteApplication(Long applicationId) {

        if (!applicationRepository.existsById(applicationId)) {
            throw new ResourceNotFoundException(
                    "Application",
                    "id",
                    applicationId);
        }

        applicationRepository.deleteById(applicationId);
    }

    /**
     * Entity -> DTO mapper
     */
    public ApplicationDTO mapToDTO(Application application) {

        return new ApplicationDTO(
                application.getApplicationId(),
                application.getSubmissionDate(),
                application.getStatus(),
                application.getFinalScore(),
                application.getCandidate().getUserId(),
                application.getCandidate().getEmail(),
                application.getCallForApplication().getCallId(),
                application.getCallForApplication().getTitle(),
                application.getCreatedAt(),
                application.getUpdatedAt()
        );
    }
}