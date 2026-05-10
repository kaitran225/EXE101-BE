package app.together.workflow.controller;

import app.together.common.shared.dto.ApiResponse;
import app.together.workflow.manager.HealthServiceManager;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HealthController {

    private final HealthServiceManager healthServiceManager;

    @GetMapping("/workflow/health")
    public ApiResponse<Map<String, String>> health() {
        return ApiResponse.ok(healthServiceManager.getWorkflowHealth());
    }
}
