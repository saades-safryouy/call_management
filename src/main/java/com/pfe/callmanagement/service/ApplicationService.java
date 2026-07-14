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
     * Create application
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

        if (applicationRepository
                .findByCandidate_UserIdAndCallForApplication_CallId(
                        dto.getCandidateId(),
                        dto.getCallId())
                .isPresent()) {

            throw new IllegalStateException(
                    "Candidate has already applied for this call.");
        }

        if (!"OPEN".equalsIgnoreCase(call.getStatus())) {
            throw new IllegalStateException(
                    "Applications are closed for this call.");
        }

        if (call.getClosingDate().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException(
                    "This call has already closed.");
        }

        Application application = new Application();

        application.setCandidate(candidate);
        application.setCallForApplication(call);
        application.setSubmissionDate(LocalDateTime.now());
        application.setStatus("SUBMITTED");
        application.setEvaluator(null);

        Application saved = applicationRepository.save(application);

        return mapToDTO(saved);
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
     * Get applications assigned to evaluator
     */
    public List<ApplicationDTO> getApplicationsByEvaluator(Long evaluatorId) {

        return applicationRepository
                .findByEvaluator_UserId(evaluatorId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update application
     */
    public ApplicationDTO updateApplication(
            Long applicationId,
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

        if ("UNDER_REVIEW".equals(dto.getStatus())
                && application.getEvaluator() == null) {

            throw new IllegalArgumentException(
                    "Assign an evaluator before changing the status.");
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

        return mapToDTO(applicationRepository.save(application));
    }

    /**
     * Assign evaluator
     */
    public ApplicationDTO assignEvaluator(
            Long applicationId,
            Long evaluatorId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application",
                                "id",
                                applicationId));

        User evaluator = userRepository.findById(evaluatorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User",
                                "id",
                                evaluatorId));

        if (!"EVALUATOR".equalsIgnoreCase(evaluator.getRole().getName())) {
            throw new IllegalArgumentException(
                    "Selected user is not an evaluator.");
        }

        if (!Boolean.TRUE.equals(evaluator.getEnabled())) {
            throw new IllegalArgumentException(
                    "Evaluator account is disabled.");
        }

        if ("ACCEPTED".equals(application.getStatus())
                || "REJECTED".equals(application.getStatus())) {

            throw new IllegalStateException(
                    "Cannot assign an evaluator to a completed application.");
        }

        application.setEvaluator(evaluator);
        application.setStatus("UNDER_REVIEW");

        return mapToDTO(applicationRepository.save(application));
    }

        /**
         * Change application status
         */

public ApplicationDTO changeStatus(Long applicationId, String status) {

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

    if (!allowedStatus.contains(status)) {
        throw new IllegalArgumentException("Invalid application status.");
    }

    application.setStatus(status);

    if ("UNDER_REVIEW".equals(status)
            || "ACCEPTED".equals(status)) {

        Double average =
                evaluationRepository.getAverageScoreForApplication(applicationId);

        if (average != null) {
            application.setFinalScore(average);
        }
    }

    return mapToDTO(applicationRepository.save(application));
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

                application.getEvaluator() != null
                        ? application.getEvaluator().getUserId()
                        : null,
                application.getEvaluator() != null
                        ? application.getEvaluator().getFirstName()
                        : null,
                        
                application.getEvaluator() != null
                        ? application.getEvaluator().getLastName()
                        : null,

                application.getEvaluator() != null
                        ? application.getEvaluator().getEmail()
                        : null,

                application.getCreatedAt(),
                application.getUpdatedAt()
        );
    }

}