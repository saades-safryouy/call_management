package com.pfe.callmanagement.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pfe.callmanagement.dto.CallForApplicationDTO;
import com.pfe.callmanagement.entity.CallForApplication;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.CallForApplicationRepository;
import com.pfe.callmanagement.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CallForApplicationService {

    private final CallForApplicationRepository callRepository;
    private final UserRepository userRepository;

    /**
     * Create Call
     */
    public CallForApplicationDTO createCall(CallForApplicationDTO dto) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User creator = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User", "email", email));

        if (dto.getClosingDate().isBefore(dto.getOpeningDate())) {
            throw new IllegalArgumentException(
                    "Closing date must be after opening date.");
        }

        CallForApplication call = new CallForApplication();

        call.setTitle(dto.getTitle());
        call.setDescription(dto.getDescription());
        call.setOpeningDate(dto.getOpeningDate());
        call.setClosingDate(dto.getClosingDate());
        call.setStatus(dto.getStatus() != null ? dto.getStatus() : "OPEN");
        call.setCreatedBy(creator);

        return mapToDTO(callRepository.save(call));
    }

    /**
     * Get Call by ID
     */
    public CallForApplicationDTO getCallById(Long callId) {

        CallForApplication call = callRepository.findById(callId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Call", "id", callId));

        return mapToDTO(call);
    }

    /**
     * Get All Calls
     */
    public List<CallForApplicationDTO> getAllCalls() {

        return callRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get Calls by Status
     */
    public List<CallForApplicationDTO> getCallsByStatus(String status) {

        return callRepository.findByStatus(status)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Active Calls
     */
    public List<CallForApplicationDTO> getActiveCalls() {

        return callRepository.findActiveOpenings(LocalDateTime.now())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Calls by Creator
     */
    public List<CallForApplicationDTO> getCallsByCreator(Long userId) {

        return callRepository.findByCreatedBy_UserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search Calls
     */
    public List<CallForApplicationDTO> searchCalls(String title) {

        return callRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    

    /**
     * Update Call
     */
    public CallForApplicationDTO updateCall(Long callId,
                                            CallForApplicationDTO dto) {

        CallForApplication call = callRepository.findById(callId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Call", "id", callId));

        if (dto.getClosingDate().isBefore(dto.getOpeningDate())) {
            throw new IllegalArgumentException(
                    "Closing date must be after opening date.");
        }

        call.setTitle(dto.getTitle());
        call.setDescription(dto.getDescription());
        call.setOpeningDate(dto.getOpeningDate());
        call.setClosingDate(dto.getClosingDate());

        if (dto.getStatus() != null) {
            call.setStatus(dto.getStatus());
        }

        return mapToDTO(callRepository.save(call));
    }

    /**
     * Delete Call
     */
    public void deleteCall(Long callId) {

        CallForApplication call = callRepository.findById(callId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Call", "id", callId));

        callRepository.delete(call);
    }

    /**
     * Mapper
     */
    public CallForApplicationDTO mapToDTO(CallForApplication call) {

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