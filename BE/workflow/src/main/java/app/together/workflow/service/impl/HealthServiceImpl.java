package app.together.workflow.service.impl;

import app.together.workflow.service.HealthService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HealthServiceImpl implements HealthService {

    @Override
    public Map<String, String> getStatus() {
        return Map.of("service", "workflow", "status", "UP");
    }
}
