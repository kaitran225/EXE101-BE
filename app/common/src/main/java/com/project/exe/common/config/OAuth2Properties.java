package com.project.exe.common.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "spring.security.oauth2.resourceserver.opaque-token")
public class OAuth2Properties {
    private String introspectionUri;
    private String clientId;
    private String clientSecret;
}

