package com.pfe.callmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.callmanagement.entity.User;

/**
 * Repository interface for User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    List<User> findByEnabledTrue();
    
    List<User> findByEnabledFalse();
    
    List<User> findByRole_Name(String roleName);

    boolean existsByEmail(String email);
}

