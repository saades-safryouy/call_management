package com.pfe.callmanagement.service;

import org.springframework.stereotype.Service;

import com.pfe.callmanagement.dto.DashboardDTO;
import com.pfe.callmanagement.repository.ApplicationRepository;
import com.pfe.callmanagement.repository.CallForApplicationRepository;
import com.pfe.callmanagement.repository.DocumentRepository;
import com.pfe.callmanagement.repository.EvaluationRepository;
import com.pfe.callmanagement.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service for dashboard statistics.
 */
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final CallForApplicationRepository callRepository;
    private final ApplicationRepository applicationRepository;
    private final EvaluationRepository evaluationRepository;
    private final DocumentRepository documentRepository;

    /**
     * Get dashboard statistics.
     */
    public DashboardDTO getStatistics() {

        return new DashboardDTO(
                userRepository.count(),
                callRepository.count(),
                applicationRepository.count(),
                evaluationRepository.count(),
                documentRepository.count()
        );
    }
}