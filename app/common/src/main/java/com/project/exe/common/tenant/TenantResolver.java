package com.project.exe.common.tenant;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class TenantResolver {

    private static final String TENANT_HEADER = "X-Tenant-Id";

    public String resolveTenantId() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String tenantId = request.getHeader(TENANT_HEADER);
            if (tenantId != null && !tenantId.isEmpty()) {
                return tenantId;
            }
        }
        return TenantContext.getTenantId();
    }
}

