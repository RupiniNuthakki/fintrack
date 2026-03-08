package com.fintrack.fintrackbackend.config;

import com.fintrack.fintrackbackend.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())  // Let CorsConfig.java handle CORS
                .authorizeHttpRequests(auth -> auth
                        // CRITICAL: Allow CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public endpoints (no authentication needed)
                        .requestMatchers("/api/auth/**").permitAll()

                        // Protected endpoints (authentication required)
                        .requestMatchers("/api/expenses/**").authenticated()
                        .requestMatchers("/api/emis/**").authenticated()
                        .requestMatchers("/api/subscriptions/**").authenticated()
                        .requestMatchers("/api/dashboard/**").authenticated()

                        // All other requests need authentication
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}