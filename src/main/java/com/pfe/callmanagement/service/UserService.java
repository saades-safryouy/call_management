package com.pfe.callmanagement.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pfe.callmanagement.dto.ChangePasswordDTO;
import com.pfe.callmanagement.dto.UpdateUserRequest;
import com.pfe.callmanagement.dto.UserDTO;
import com.pfe.callmanagement.entity.Role;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.DuplicateResourceException;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.RoleRepository;
import com.pfe.callmanagement.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;

/**
 * Service for user management operations.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

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
     * Get all disabled users
     */
    public List<UserDTO> getAllDisabledUsers() {
        return userRepository.findByEnabledFalse()
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
    public UserDTO updateUser(Long userId, UpdateUserRequest request) {

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User", "id", userId));

    // Prevent duplicate email
    if (!user.getEmail().equals(request.getEmail())
            && userRepository.existsByEmail(request.getEmail())) {

        throw new DuplicateResourceException(
                "User",
                "email",
                request.getEmail());
    }

    Role role = roleRepository.findByName(request.getRoleName())
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Role",
                            "name",
                            request.getRoleName()));

    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setEmail(request.getEmail());
    user.setEnabled(request.getEnabled());
    user.setRole(role);

    User updatedUser = userRepository.save(user);

    return mapToUserDTO(updatedUser);
}
    /**
     * Delete user
     */
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User", "id", userId));
        
        // Prevent an administrator from deleting their own account
        String currentUserEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        
        if (user.getEmail().equals(currentUserEmail)) {
            throw new IllegalArgumentException("You cannot delete your own account.");
        }
    
        userRepository.delete(user);
}

    /**
     * Change password of the authenticated user.
     */
    public void changePassword(ChangePasswordDTO dto) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User", "email", email));

        // Verify current password
        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect.");
        }

        // Prevent using the same password
        if (passwordEncoder.matches(dto.getNewPassword(), user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from the current password.");
        }

        // Encode and save the new password
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));

        userRepository.save(user);
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
