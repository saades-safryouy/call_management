package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for authentication response containing JWT token.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {

    private String token;

    private String type = "Bearer";

    private Long userId;

    private String username;

    private String email;

    private String roleName;
}
