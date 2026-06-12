package com.pfe.callmanagement.service;

import com.pfe.callmanagement.dto.LoginRequest;
import com.pfe.callmanagement.dto.RegisterRequest;
import com.pfe.callmanagement.dto.AuthResponse;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.exception.DuplicateResourceException;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.RoleRepository;
import com.pfe.callmanagement.repository.UserRepository;
import com.pfe.callmanagement.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for authentication operations.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Register a new user
     */
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User", "email", request.getEmail());
        }

        var role = roleRepository.findByName(request.getRoleName())
            .orElseThrow(() -> new ResourceNotFoundException("Role", "name", request.getRoleName()));

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(role);
        user.setEnabled(true);

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());

        return new AuthResponse(
            token,
            "Bearer",
            savedUser.getUserId(),
            savedUser.getEmail(),
            role.getName()
        );
    }

    /**
     * Authenticate user and generate JWT token
     */
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        return new AuthResponse(
            token,
            "Bearer",
            user.getUserId(),
            user.getEmail(),
            user.getRole().getName()
        );
    }
}
