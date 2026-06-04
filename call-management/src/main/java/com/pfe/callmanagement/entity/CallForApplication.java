package com.pfe.callmanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * CallForApplication entity representing a job/grant application call.
 * Contains details about the opening, closing dates, and status.
 */
@Entity
@Table(name = "calls_for_application", indexes = {
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_opening_date", columnList = "opening_date")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CallForApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long callId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "opening_date", nullable = false)
    private LocalDateTime openingDate;

    @Column(name = "closing_date", nullable = false)
    private LocalDateTime closingDate;

    @Column(name = "status", nullable = false, length = 50)
    private String status;  // OPEN, CLOSED, IN_REVIEW, PUBLISHED

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Many to One: Each call is created by one user (admin/manager)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    // One to Many: One call can have many applications
    @OneToMany(mappedBy = "callForApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Application> applications = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = "OPEN";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

