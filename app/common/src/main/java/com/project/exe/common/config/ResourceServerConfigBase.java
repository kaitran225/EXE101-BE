package com.project.exe.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Base resource server configuration for OAuth2 JWT authentication.
 * All resource servers (read, workflow, email, cronjob) use this configuration
 * and authenticate via the authen module's authorization server.
 * <p>
 * The JWK Set URI points to the authen module (default: http://localhost:8081/.well-known/jwks.json)
 * Only the authen module handles authentication/authorization - all other modules are resource servers.
 */
@Configuration
@EnableWebSecurity
public class ResourceServerConfigBase {

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri:http://localhost:8081/.well-known/jwks.json}")
    private String jwkSetUri;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/actuator/**", "/error", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwkSetUri(jwkSetUri)
                        )
                )
                .headers(headers -> SecurityHeadersConfiguration.configureSecurityHeaders(headers))
                .cors(cors -> {
                });
        return http.build();
    }
}

