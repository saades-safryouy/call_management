package com.pfe.callmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pfe.callmanagement.dto.ApplicationDTO;
import com.pfe.callmanagement.dto.DashboardDTO;
import com.pfe.callmanagement.dto.EvaluatorDashboardDTO;
import com.pfe.callmanagement.repository.ApplicationRepository;
import com.pfe.callmanagement.repository.CallForApplicationRepository;
import com.pfe.callmanagement.repository.DocumentRepository;
import com.pfe.callmanagement.repository.EvaluationRepository;
import com.pfe.callmanagement.repository.UserRepository;
import com.pfe.callmanagement.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final CallForApplicationRepository callRepository;
    private final ApplicationRepository applicationRepository;
    private final EvaluationRepository evaluationRepository;
    private final DocumentRepository documentRepository;
    private final ApplicationService applicationService;

    public DashboardDTO getStatistics() {

        List<ApplicationDTO> recentApplications =
                applicationRepository
                        .findTop5ByOrderBySubmissionDateDesc()
                        .stream()
                        .map(applicationService::mapToDTO)
                        .toList();

       return new DashboardDTO(
    userRepository.count(),
    callRepository.count(),
    applicationRepository.count(),
    evaluationRepository.count(),
    documentRepository.count(),

    applicationRepository.countByStatus("SUBMITTED"),
    applicationRepository.countByStatus("UNDER_REVIEW"),
    applicationRepository.countByStatus("SHORTLISTED"),
    applicationRepository.countByStatus("ACCEPTED"),
    applicationRepository.countByStatus("REJECTED"),

    callRepository.countByStatus("OPEN"),
    callRepository.countByStatus("CLOSED"),
    callRepository.countByStatus("DRAFT"),

    recentApplications
);
    }

   public EvaluatorDashboardDTO getEvaluatorDashboard(Long evaluatorId) {

    User evaluator = userRepository.findById(evaluatorId)
            .orElseThrow(() -> new RuntimeException("Evaluator not found"));

    long totalAssigned = applicationRepository.countByEvaluator(evaluator);

    long pending =
            applicationRepository.countByEvaluatorAndStatus(evaluator, "SUBMITTED")
          + applicationRepository.countByEvaluatorAndStatus(evaluator, "UNDER_REVIEW");

    long completed =
            applicationRepository.countByEvaluatorAndStatus(evaluator, "ACCEPTED")
          + applicationRepository.countByEvaluatorAndStatus(evaluator, "REJECTED")
          + applicationRepository.countByEvaluatorAndStatus(evaluator, "SHORTLISTED");

    Double averageScore = applicationRepository.getAverageScoreByEvaluator(evaluator);

    if (averageScore == null) {
        averageScore = 0.0;
    }

    return new EvaluatorDashboardDTO(
            pending,
            completed,
            totalAssigned,
            averageScore
    );
}
}
   
