package com.project.exe.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(ResourceServerConfigBase.class)
public class SecurityConfig {

}

