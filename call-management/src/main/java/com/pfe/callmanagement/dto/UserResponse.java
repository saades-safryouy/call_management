package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for User response.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long userId;

    private String email;

    private String firstName;

    private String lastName;

    private Boolean enabled;

    private String roleName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
