package com.pfe.callmanagement.service;

import com.pfe.callmanagement.dto.CallForApplicationDTO;
import com.pfe.callmanagement.entity.CallForApplication;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.CallForApplicationRepository;
import com.pfe.callmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for call for application management operations.
 */
@Service
@RequiredArgsConstructor
public class CallForApplicationService {

    private final CallForApplicationRepository callRepository;
    private final UserRepository userRepository;

    /**
     * Create a new call for application
     */
    public CallForApplicationDTO createCall(CallForApplicationDTO dto) {
        User creator = userRepository.findById(dto.getCreatedById())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", dto.getCreatedById()));

        CallForApplication call = new CallForApplication();
        call.setTitle(dto.getTitle());
        call.setDescription(dto.getDescription());
        call.setOpeningDate(dto.getOpeningDate());
        call.setClosingDate(dto.getClosingDate());
        call.setStatus(dto.getStatus() != null ? dto.getStatus() : "OPEN");
        call.setCreatedBy(creator);

        CallForApplication savedCall = callRepository.save(call);
        return mapToDTO(savedCall);
    }

    /**
     * Get call by ID
     */
    public CallForApplicationDTO getCallById(Long callId) {
        CallForApplication call = callRepository.findById(callId)
            .orElseThrow(() -> new ResourceNotFoundException("Call", "id", callId));
        return mapToDTO(call);
    }

    /**
     * Get all calls
     */
    public List<CallForApplicationDTO> getAllCalls() {
        return callRepository.findAll()
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get calls by status
     */
    public List<CallForApplicationDTO> getCallsByStatus(String status) {
        return callRepository.findByStatus(status)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get active calls (not yet closed)
     */
    public List<CallForApplicationDTO> getActiveCalls() {
        return callRepository.findActiveOpenings(LocalDateTime.now())
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get calls created by a user
     */
    public List<CallForApplicationDTO> getCallsByCreator(Long userId) {
        return callRepository.findByCreatedBy_UserId(userId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Update call
     */
    public CallForApplicationDTO updateCall(Long callId, CallForApplicationDTO dto) {
        CallForApplication call = callRepository.findById(callId)
            .orElseThrow(() -> new ResourceNotFoundException("Call", "id", callId));

        call.setTitle(dto.getTitle());
        call.setDescription(dto.getDescription());
        call.setOpeningDate(dto.getOpeningDate());
        call.setClosingDate(dto.getClosingDate());
        call.setStatus(dto.getStatus());

        CallForApplication updatedCall = callRepository.save(call);
        return mapToDTO(updatedCall);
    }

    /**
     * Delete call
     */
    public void deleteCall(Long callId) {
        if (!callRepository.existsById(callId)) {
            throw new ResourceNotFoundException("Call", "id", callId);
        }
        callRepository.deleteById(callId);
    }

    /**
     * Helper method to map entity to DTO
     */
    private CallForApplicationDTO mapToDTO(CallForApplication call) {
        return new CallForApplicationDTO(
            call.getCallId(),
            call.getTitle(),
            call.getDescription(),
            call.getOpeningDate(),
            call.getClosingDate(),
            call.getStatus(),
            call.getCreatedBy().getUserId(),
            call.getCreatedBy().getEmail(),
            call.getCreatedAt(),
            call.getUpdatedAt()
        );
    }
}
