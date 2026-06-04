package com.pfe.callmanagement.controller;

import com.pfe.callmanagement.dto.UserDTO;
import com.pfe.callmanagement.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for user management endpoints.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management endpoints")
public class UserController {

    private final UserService userService;

    /**
     * Get user by ID endpoint
     */
    @GetMapping("/{userId}")
    @Operation(summary = "Get user by ID", description = "Retrieve user information by user ID")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        UserDTO response = userService.getUserById(userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all enabled users endpoint
     */
    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieve all enabled users in the system")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> response = userService.getAllEnabledUsers();
        return ResponseEntity.ok(response);
    }

    /**
     * Get users by role endpoint
     */
    @GetMapping("/role/{roleName}")
    @Operation(summary = "Get users by role", description = "Retrieve all users with a specific role")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@PathVariable String roleName) {
        List<UserDTO> response = userService.getUsersByRole(roleName);
        return ResponseEntity.ok(response);
    }

    /**
     * Update user endpoint
     */
    @PutMapping("/{userId}")
    @Operation(summary = "Update user", description = "Update user information")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long userId, @Valid @RequestBody UserDTO userDTO) {
        UserDTO response = userService.updateUser(userId, userDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete user endpoint
     */
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete user", description = "Delete a user account")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
