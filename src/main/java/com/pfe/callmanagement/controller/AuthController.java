package com.pfe.callmanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.callmanagement.dto.AuthResponse;
import com.pfe.callmanagement.dto.LoginRequest;
import com.pfe.callmanagement.dto.RegisterRequest;
import com.pfe.callmanagement.dto.UserDTO;
import com.pfe.callmanagement.service.AuthService;
import com.pfe.callmanagement.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Controller for authentication and user registration endpoints.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User authentication and registration endpoints")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    /**
     * User login endpoint
     */
    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user with username and password")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * User registration endpoint
     */
    @PostMapping("/register")
    @Operation(summary = "User registration", description = "Register a new user account")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get current user profile endpoint
     */
    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Get the profile of the authenticated user")
    public ResponseEntity<UserDTO> getCurrentUser() {
        UserDTO response = userService.getCurrentUser();
        return ResponseEntity.ok(response);
    }
}
