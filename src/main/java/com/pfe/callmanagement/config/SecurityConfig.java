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

                // =====================================================
                // PUBLIC
                // =====================================================

                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/swagger-ui.html").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                .requestMatchers("/api-docs/**").permitAll()

                // =====================================================
                // USER PROFILE
                // =====================================================

                .requestMatchers(HttpMethod.GET, "/users/me")
                .authenticated()

                .requestMatchers(HttpMethod.PUT, "/users/change-password")
                .authenticated()

                // =====================================================
                // ADMIN ONLY
                // =====================================================

                .requestMatchers("/users/**")
                .hasAnyRole("ADMIN" , "HR")

                .requestMatchers("/roles/**")
                .hasRole("ADMIN")

                // =====================================================
                // CALLS
                // =====================================================

                // Active calls visible to everyone
                .requestMatchers(HttpMethod.GET, "/calls/active")
                .hasAnyRole(
                        "ADMIN",
                        "HR",
                        "MANAGER",
                        "EVALUATOR",
                        "CANDIDATE")

                // Internal calls
                .requestMatchers(HttpMethod.GET, "/calls/**")
                .hasAnyRole(
                        "ADMIN",
                        "HR",
                        "MANAGER",
                        "EVALUATOR")

                // HR manages calls
                .requestMatchers(HttpMethod.POST, "/calls/**")
                .hasRole("HR")

                .requestMatchers(HttpMethod.PUT, "/calls/**")
                .hasRole("HR")

                .requestMatchers(HttpMethod.DELETE, "/calls/**")
                .hasRole("HR")

                // =====================================================
                // APPLICATIONS
                // =====================================================

                .requestMatchers(HttpMethod.GET, "/applications/**")
                .hasAnyRole(
                        "ADMIN",
                        "HR",
                        "MANAGER",
                        "EVALUATOR",
                        "CANDIDATE")

                // Candidate submits applications
                .requestMatchers(HttpMethod.POST, "/applications/**")
                .hasRole("CANDIDATE")

                // HR updates application status
                .requestMatchers(HttpMethod.PUT, "/applications/**")
                .hasRole("HR")

                // No deletion
                .requestMatchers(HttpMethod.DELETE, "/applications/**")
                .denyAll()

                // =====================================================
                // DOCUMENTS
                // =====================================================

                // Candidate uploads documents
                .requestMatchers(HttpMethod.POST, "/documents/**")
                .hasRole("CANDIDATE")

                // Everyone involved can download/view
                .requestMatchers(HttpMethod.GET, "/documents/**")
                .hasAnyRole(
                        "HR",
                        "ADMIN",
                        "MANAGER",
                        "EVALUATOR",
                        "CANDIDATE")

                // No delete
                .requestMatchers(HttpMethod.DELETE, "/documents/**")
                .denyAll()

                // =====================================================
                // EVALUATIONS
                // =====================================================

                // HR, Manager and Admin may consult evaluations
                .requestMatchers(HttpMethod.GET, "/evaluations/**")
                .hasAnyRole(
                        "ADMIN",
                        "HR",
                        "MANAGER",
                        "EVALUATOR")

                // Only evaluator writes evaluations
                .requestMatchers(HttpMethod.POST, "/evaluations/**")
                .hasRole("EVALUATOR")

                .requestMatchers(HttpMethod.PUT, "/evaluations/**")
                .hasRole("EVALUATOR")

                // No delete
                .requestMatchers(HttpMethod.DELETE, "/evaluations/**")
                .denyAll()

                // =====================================================
                // CANDIDATE
                // =====================================================

                .requestMatchers("/candidate/**")
                .hasRole("CANDIDATE")

                // =====================================================
                // DASHBOARDS
                // =====================================================

                .requestMatchers(HttpMethod.GET, "/dashboard/statistics")
                .hasAnyRole("ADMIN", "HR" , "MANAGER")

                .requestMatchers("/dashboard/admin/**")
                .hasRole("ADMIN")

                .requestMatchers("/dashboard/hr/**")
                .hasRole("HR")

                .requestMatchers("/dashboard/manager/**")
                .hasRole("MANAGER")

                .requestMatchers("/dashboard/evaluator/**")
                .hasRole("EVALUATOR")

                .requestMatchers("/dashboard/candidate/**")
                .hasRole("CANDIDATE")

                // =====================================================
                // EVERYTHING ELSE
                // =====================================================

                .anyRequest().authenticated()

            )

            .addFilterBefore(
                    jwtAuthenticationFilter(),
                    UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}