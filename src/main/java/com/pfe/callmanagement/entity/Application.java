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
 * Application entity representing a candidate's application to a call.
 */
@Entity
@Table(name = "applications", indexes = {
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_submission_date", columnList = "submission_date")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    @Column(name = "status", nullable = false, length = 50)
    private String status;  // SUBMITTED, UNDER_REVIEW, ACCEPTED, REJECTED, SHORTLISTED

    @Column(name = "final_score")
    private Double finalScore;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Many to One: Each application belongs to one candidate (user)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    // Many to One: Each application belongs to one call
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "call_id", nullable = false)
    private CallForApplication callForApplication;

    // One to Many: One application can have many documents
    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Document> documents = new HashSet<>();

    // One to Many: One application can have many evaluations
    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Evaluation> evaluations = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        submissionDate = LocalDateTime.now();
        if (status == null) {
            status = "SUBMITTED";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
