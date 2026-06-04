package com.pfe.callmanagement.service;

import com.pfe.callmanagement.dto.UserDTO;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for user management operations.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Get user by ID
     */
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return mapToUserDTO(user);
    }

    /**
     * Get all enabled users
     */
    public List<UserDTO> getAllEnabledUsers() {
        return userRepository.findByEnabledTrue()
            .stream()
            .map(this::mapToUserDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get users by role
     */
    public List<UserDTO> getUsersByRole(String roleName) {
        return userRepository.findByRole_Name(roleName)
            .stream()
            .map(this::mapToUserDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get user by email
     */
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return mapToUserDTO(user);
    }

    /**
     * Get current authenticated user
     */
    public UserDTO getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return getUserByEmail(email);
    }

    /**
     * Update user information
     */
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());

        User updatedUser = userRepository.save(user);
        return mapToUserDTO(updatedUser);
    }

    /**
     * Delete user
     */
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User", "id", userId);
        }
        userRepository.deleteById(userId);
    }

    /**
     * Helper method to map User entity to UserDTO
     */
    private UserDTO mapToUserDTO(User user) {
        return new UserDTO(
            user.getUserId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getEnabled(),
            user.getRole().getName(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }
}
