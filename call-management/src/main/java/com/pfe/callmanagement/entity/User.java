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
 * User entity representing system users (admins, managers, evaluators, candidates).
 * Can have roles: ADMIN, MANAGER, EVALUATOR, CANDIDATE
 */
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_email", columnList = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "enabled")
    private Boolean enabled = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Many to One: Each user has one role
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    // One to Many: User can create many calls for applications
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<CallForApplication> createdCalls = new HashSet<>();

    // One to Many: User can submit many applications
    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Application> applications = new HashSet<>();

    // One to Many: User can evaluate many applications
    @OneToMany(mappedBy = "evaluator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Evaluation> evaluations = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
