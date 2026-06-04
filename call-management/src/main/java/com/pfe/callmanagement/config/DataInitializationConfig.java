package com.pfe.callmanagement.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.pfe.callmanagement.entity.Role;
import com.pfe.callmanagement.entity.User;
import com.pfe.callmanagement.repository.RoleRepository;
import com.pfe.callmanagement.repository.UserRepository;

/**
 * Data initialization configuration.
 * Populates database with sample roles and users on application startup.
 */
@Configuration
public class DataInitializationConfig {

    @Bean
    public CommandLineRunner initializeData(
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
 
        return args -> {
            // Initialize roles if they don't exist
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setName("ADMIN");
                adminRole.setDescription("Administrator role with full system access");
                roleRepository.save(adminRole);

                Role managerRole = new Role();
                managerRole.setName("MANAGER");
                managerRole.setDescription("Manager role with application management capabilities");
                roleRepository.save(managerRole);

                Role evaluatorRole = new Role();
                evaluatorRole.setName("EVALUATOR");
                evaluatorRole.setDescription("Evaluator role for evaluating applications");
                roleRepository.save(evaluatorRole);

                Role candidateRole = new Role();
                candidateRole.setName("CANDIDATE");
                candidateRole.setDescription("Candidate role for submitting applications");
                roleRepository.save(candidateRole);
            }

            // Create sample admin user if it doesn't exist
            if (userRepository.findByEmail("admin@applications.com").isEmpty()) {
                Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
                User adminUser = new User();
                adminUser.setEmail("admin@applications.com");
                adminUser.setPassword(passwordEncoder.encode("Admin@123"));
                adminUser.setFirstName("Admin");
                adminUser.setLastName("User");
                adminUser.setRole(adminRole);
                adminUser.setEnabled(true);
                userRepository.save(adminUser);
            }

            // Create sample manager user
            if (userRepository.findByEmail("manager1@applications.com").isEmpty()) {
                Role managerRole = roleRepository.findByName("MANAGER").orElseThrow();
                User managerUser = new User();
                managerUser.setEmail("manager1@applications.com");
                managerUser.setPassword(passwordEncoder.encode("Manager@123"));
                managerUser.setFirstName("John");
                managerUser.setLastName("Manager");
                managerUser.setRole(managerRole);
                managerUser.setEnabled(true);
                userRepository.save(managerUser);
            }

            // Create sample evaluator users
            if (userRepository.findByEmail("evaluator1@applications.com").isEmpty()) {
                Role evaluatorRole = roleRepository.findByName("EVALUATOR").orElseThrow();
                User evaluatorUser = new User();
                evaluatorUser.setEmail("evaluator1@applications.com");
                evaluatorUser.setPassword(passwordEncoder.encode("Evaluator@123"));
                evaluatorUser.setFirstName("Alice");
                evaluatorUser.setLastName("Evaluator");
                evaluatorUser.setRole(evaluatorRole);
                evaluatorUser.setEnabled(true);
                userRepository.save(evaluatorUser);
            }

            if (userRepository.findByEmail("evaluator2@applications.com").isEmpty()) {
                Role evaluatorRole = roleRepository.findByName("EVALUATOR").orElseThrow();
                User evaluatorUser = new User();
                evaluatorUser.setEmail("evaluator2@applications.com");
                evaluatorUser.setPassword(passwordEncoder.encode("Evaluator@123"));
                evaluatorUser.setFirstName("Bob");
                evaluatorUser.setLastName("Evaluator");
                evaluatorUser.setRole(evaluatorRole);
                evaluatorUser.setEnabled(true);
                userRepository.save(evaluatorUser);
            }

            // Create sample candidate users
            if (userRepository.findByEmail("candidate1@applications.com").isEmpty()) {
                Role candidateRole = roleRepository.findByName("CANDIDATE").orElseThrow();
                User candidateUser = new User();
                candidateUser.setEmail("candidate1@applications.com");
                candidateUser.setPassword(passwordEncoder.encode("Candidate@123"));
                candidateUser.setFirstName("Jane");
                candidateUser.setLastName("Candidate");
                candidateUser.setRole(candidateRole);
                candidateUser.setEnabled(true);
                userRepository.save(candidateUser);
            }

            if (userRepository.findByEmail("candidate2@applications.com").isEmpty()) {
                Role candidateRole = roleRepository.findByName("CANDIDATE").orElseThrow();
                User candidateUser = new User();
                candidateUser.setEmail("candidate2@applications.com");
                candidateUser.setPassword(passwordEncoder.encode("Candidate@123"));
                candidateUser.setFirstName("Charlie");
                candidateUser.setLastName("Candidate");
                candidateUser.setRole(candidateRole);
                candidateUser.setEnabled(true);
                userRepository.save(candidateUser);
            }

            System.out.println("Data initialization completed successfully!");
        };
    }
}

