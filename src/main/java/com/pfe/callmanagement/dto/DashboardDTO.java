package com.pfe.callmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for dashboard statistics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {

    private long users;
    private long calls;
    private long applications;
    private long evaluations;
    private long documents;
}