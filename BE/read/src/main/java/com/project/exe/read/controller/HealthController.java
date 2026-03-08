package com.project.exe.read.controller;

import com.project.exe.common.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @GetMapping("/read/health")
    public ApiResponse<Map<String, String>> health() {
        return ApiResponse.ok(Map.of("service", "read", "status", "UP"));
    }
}
