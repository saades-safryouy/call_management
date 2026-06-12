package com.pfe.callmanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Evaluation entity representing the evaluation of an application.
 */
@Entity
@Table(name = "evaluations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluationId;

    @Column(name = "score", nullable = false)
    private Double score;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "evaluation_date", nullable = false)
    private LocalDateTime evaluationDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Many to One: Each evaluation belongs to one application
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    // Many to One: Each evaluation is done by one evaluator (user)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "evaluator_id", nullable = false)
    private User evaluator;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (evaluationDate == null) {
            evaluationDate = LocalDateTime.now();
        }
    }
}
