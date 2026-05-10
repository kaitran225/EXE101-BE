package app.together.common.shared.security;

/**
 * Application permissions. Each constant carries:
 * <ul>
 *   <li>{@link #code()} — stable id for APIs, logs, and config (do not rename casually).</li>
 *   <li>{@link #minTierLevel()} — suggested floor vs {@link app.together.common.auth.enums.UserTier#level()};
 *       {@code -1} means “no default here”; {@link PermissionMatrix} remains authoritative until you wire this.</li>
 *   <li>{@link #sensitivity()} — coarse rank for auditing / UI (higher = more privileged).</li>
 * </ul>
 * Add new enum constants as features ship; keep existing {@link #code()} values stable.
 */
public enum Permission {

    USER_SELF_READ("user.self.read", -1, 0),

    USER_SELF_WRITE("user.self.write", -1, 1),

    WORKFLOW_READ("workflow.read", -1, 0),

    WORKFLOW_WRITE("workflow.write", -1, 1),

    TEAM_MANAGE("team.manage", -1, 2),

    ROOM_MODERATE("room.moderate", -1, 2),

    ORG_ADMIN_ACTIONS("org.admin.actions", -1, 3),

    PLATFORM_AUDIT_READ("platform.audit.read", -1, 3),

    PLATFORM_CONFIG_WRITE("platform.config.write", -1, 4);

    private final String code;
    /** {@code -1} = no tier hint on the permission itself. */
    private final int minTierLevel;
    private final int sensitivity;

    Permission(String code, int minTierLevel, int sensitivity) {
        this.code = code;
        this.minTierLevel = minTierLevel;
        this.sensitivity = sensitivity;
    }

    public String code() {
        return code;
    }

    public int minTierLevel() {
        return minTierLevel;
    }

    public int sensitivity() {
        return sensitivity;
    }

    /** Match {@link #code()}; returns {@code null} if unknown or blank. */
    public static Permission fromCode(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        String s = raw.trim();
        for (Permission p : values()) {
            if (p.code.equals(s)) {
                return p;
            }
        }
        return null;
    }
}
