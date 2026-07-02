package com.pfe.callmanagement.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.pfe.callmanagement.security.CustomUserDetailsService;
import com.pfe.callmanagement.security.JwtAuthenticationFilter;
import com.pfe.callmanagement.security.JwtTokenProvider;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());

        return authenticationManagerBuilder.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtTokenProvider, userDetailsService);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://localhost:4200"
        ));

        configuration.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                // =========================
                // Public Endpoints
                // =========================

                .requestMatchers("/auth/**").permitAll()

                .requestMatchers("/public/**").permitAll()

                .requestMatchers("/swagger-ui/**").permitAll()

                .requestMatchers("/swagger-ui.html").permitAll()

                .requestMatchers("/v3/api-docs/**").permitAll()

                .requestMatchers("/api-docs/**").permitAll()

                .requestMatchers("/dashboard/**")
                .hasAnyRole("ADMIN", "MANAGER", "HR")


                // =========================
                // Role Management
                // =========================

                .requestMatchers("/roles/**")
                .hasRole("ADMIN")


                // =========================
                // User Management
                // =========================

                .requestMatchers(HttpMethod.GET, "/users/me")
                .authenticated()

                .requestMatchers(HttpMethod.PUT, "/users/change-password")
                .authenticated()

                .requestMatchers("/users/**")
                .hasRole("ADMIN")

                // =========================
                // Calls For Applications
                // =========================

                // Everyone can view active calls
                .requestMatchers(HttpMethod.GET, "/calls/active")
                .hasAnyRole("ADMIN","HR","MANAGER","EVALUATOR","CANDIDATE")

                // Employees can view all calls
                .requestMatchers(HttpMethod.GET, "/calls/**")
                .hasAnyRole("ADMIN","HR","MANAGER","EVALUATOR")

                // Create calls
                .requestMatchers(HttpMethod.POST, "/calls/**")
                .hasAnyRole("ADMIN","HR","MANAGER")

                // Update calls
                .requestMatchers(HttpMethod.PUT, "/calls/**")
                .hasAnyRole("ADMIN","HR","MANAGER")

                // Delete calls
                .requestMatchers(HttpMethod.DELETE, "/calls/**")
                .hasAnyRole("ADMIN", "HR", "MANAGER")


                // =========================
                // Candidate
                // =========================

                .requestMatchers("/candidate/**")
                .hasRole("CANDIDATE")  


                // =========================
                // Applications
                // =========================

                .requestMatchers(HttpMethod.GET, "/applications/**")
                .hasAnyRole("ADMIN","HR","MANAGER","EVALUATOR","CANDIDATE")

                .requestMatchers(HttpMethod.POST, "/applications/**")
                .hasRole("CANDIDATE")

                .requestMatchers(HttpMethod.PUT, "/applications/**")
                .hasAnyRole("ADMIN","HR","MANAGER")

                .requestMatchers(HttpMethod.DELETE, "/applications/**")
                .hasAnyRole("ADMIN","HR")


                

                // =========================
                // Evaluations
                // =========================

                .requestMatchers(HttpMethod.GET, "/evaluations/**")
                .hasAnyRole("ADMIN","MANAGER","EVALUATOR")

                .requestMatchers(HttpMethod.POST, "/evaluations/**")
                .hasAnyRole("ADMIN","MANAGER","EVALUATOR")

                .requestMatchers(HttpMethod.PUT, "/evaluations/**")
                .hasAnyRole("ADMIN","MANAGER","EVALUATOR")

                .requestMatchers(HttpMethod.DELETE, "/evaluations/**")
                .hasAnyRole("ADMIN","MANAGER")


                // =========================
                // Documents
                // =========================

                .requestMatchers("/documents/**")
                .authenticated()


                // =========================
                // Dashboard
                // =========================

                .requestMatchers("/dashboard/admin/**")
                .hasRole("ADMIN")

                .requestMatchers("/dashboard/hr/**")
                .hasAnyRole("ADMIN","HR")

                .requestMatchers("/dashboard/manager/**")
                .hasAnyRole("ADMIN","MANAGER")

                .requestMatchers("/dashboard/evaluator/**")
                .hasAnyRole("ADMIN","EVALUATOR")

                .requestMatchers("/dashboard/candidate/**")
                .hasRole("CANDIDATE")


                // =========================
                // Everything Else
                // =========================

                .anyRequest().authenticated()

            )

            .addFilterBefore(
                    jwtAuthenticationFilter(),
                    UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}