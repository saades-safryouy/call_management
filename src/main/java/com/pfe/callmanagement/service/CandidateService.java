package com.pfe.callmanagement.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pfe.callmanagement.dto.ApplicationDTO;
import com.pfe.callmanagement.dto.CallForApplicationDTO;
import com.pfe.callmanagement.dto.CandidateDashboardDTO;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.ApplicationRepository;
import com.pfe.callmanagement.repository.CallForApplicationRepository;
import com.pfe.callmanagement.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final CallForApplicationRepository callRepository;

    private final ApplicationService applicationService;
    private final CallForApplicationService callService;

    public CandidateDashboardDTO getDashboard() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User", "email", email));

        Long candidateId = candidate.getUserId();

        Long total = applicationRepository.countByCandidate_UserId(candidateId);

        Long submitted = applicationRepository
                .countByCandidate_UserIdAndStatus(candidateId, "SUBMITTED");

        Long underReview = applicationRepository
                .countByCandidate_UserIdAndStatus(candidateId, "UNDER_REVIEW");

        Long accepted = applicationRepository
                .countByCandidate_UserIdAndStatus(candidateId, "ACCEPTED");

        Long rejected = applicationRepository
                .countByCandidate_UserIdAndStatus(candidateId, "REJECTED");

        Double average = applicationRepository
                .getAverageScoreByCandidate(candidateId);

        if (average == null) {
            average = 0.0;
        }

        List<ApplicationDTO> recentApplications =
                applicationRepository
                        .findTop5ByCandidate_UserIdOrderBySubmissionDateDesc(candidateId)
                        .stream()
                        .map(applicationService::mapToDTO)
                        .toList();

        List<CallForApplicationDTO> activeCalls =
                callRepository
                        .findTop6ByStatusOrderByOpeningDateDesc("OPEN")
                        .stream()
                        .map(callService::mapToDTO)
                        .toList();

        return new CandidateDashboardDTO(
                total,
                submitted,
                underReview,
                accepted,
                rejected,
                average,
                recentApplications,
                activeCalls
        );
    }

    public List<ApplicationDTO> getMyApplications() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User", "email", email));

        return applicationRepository
                .findByCandidate_UserId(candidate.getUserId())
                .stream()
                .map(applicationService::mapToDTO)
                .toList();
    }
}