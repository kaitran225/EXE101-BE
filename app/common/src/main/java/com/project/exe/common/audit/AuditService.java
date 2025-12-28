package com.project.exe.common.audit;

import com.project.exe.common.enums.OperationType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class AuditService {

    private final AuditRepository auditRepository;

    public AuditService(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public void audit(String entityType, Long entityId, OperationType operationType,
                      String oldValue, String newValue) {
        AuditEntity audit = new AuditEntity();
        audit.setEntityType(entityType);
        audit.setEntityId(entityId);
        audit.setOperationType(operationType);
        audit.setOldValue(oldValue);
        audit.setNewValue(newValue);

        // Get user from security context
        String userId = SecurityContextHolder.getContext().getAuthentication() != null
                ? SecurityContextHolder.getContext().getAuthentication().getName()
                : "system";
        audit.setCreatedBy(userId);

        // Get request information
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            audit.setIpAddress(getClientIpAddress(request));
            audit.setUserAgent(request.getHeader("User-Agent"));
        }

        auditRepository.save(audit);
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}

