package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

/**
 * DTO for User registration/creation request.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String firstName;

    private String lastName;

    @NotBlank(message = "Role is required")
    private String roleName;
}
