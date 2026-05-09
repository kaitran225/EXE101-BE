package app.together.workflow.service.manager.impl;

import app.together.workflow.service.HealthService;
import app.together.workflow.service.manager.HealthServiceManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class HealthServiceManagerImpl implements HealthServiceManager {

    private final HealthService healthService;

    @Override
    public Map<String, String> getWorkflowHealth() {
        return healthService.getStatus();
    }
}
