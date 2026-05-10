package app.together.common.shared.security;

import app.together.common.auth.enums.BusinessRole;
import app.together.common.auth.enums.SystemRole;
import app.together.common.auth.enums.UserTier;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

/**
 * Permission → conjunctive rules ({@link PermissionRule}). Access is granted when <strong>every</strong>
 * rule in the row {@link PermissionRule#matches matches}. Platform admin bypasses the matrix.
 * <p>
 * <strong>Maintaining:</strong> edit role bundles in {@link Bundles}, reusable shapes in {@link Patterns},
 * and the exhaustive {@link #rulesFor(Permission)} switch — new {@link Permission} constants require a
 * {@code case} or the project will not compile.
 */
public final class PermissionMatrix {

    /** Shared {@link EnumSet}s — change once, affects every pattern that uses them. */
    private static final class Bundles {
        static final EnumSet<SystemRole> ANY_SYSTEM_ACCOUNT =
                EnumSet.of(SystemRole.USER, SystemRole.ADMIN);
        static final EnumSet<BusinessRole> ANY_BUSINESS = EnumSet.allOf(BusinessRole.class);
        static final EnumSet<BusinessRole> STAFF =
                EnumSet.of(BusinessRole.TEACHER, BusinessRole.ORG_ADMIN);
        static final EnumSet<BusinessRole> ORG_LEADS = EnumSet.of(BusinessRole.ORG_ADMIN);

        private Bundles() {}
    }

    /** Named rule templates — add methods here as product rules grow. */
    private static final class Patterns {
        static PermissionRule loggedInCustomer() {
            return PermissionRule.systemAndBusiness(Bundles.ANY_SYSTEM_ACCOUNT, Bundles.ANY_BUSINESS);
        }

        static PermissionRule loggedInStaff() {
            return PermissionRule.systemAndBusiness(Bundles.ANY_SYSTEM_ACCOUNT, Bundles.STAFF);
        }

        static PermissionRule orgAdminOnly() {
            return PermissionRule.systemAndBusiness(Bundles.ANY_SYSTEM_ACCOUNT, Bundles.ORG_LEADS);
        }

        static PermissionRule platformAdminOnly() {
            return PermissionRule.systemOnly(SystemRole.ADMIN);
        }

        private Patterns() {}
    }

    private static final Map<Permission, List<PermissionRule>> RULES = new EnumMap<>(Permission.class);

    static {
        for (Permission p : Permission.values()) {
            RULES.put(p, rulesFor(p));
        }
    }

    private PermissionMatrix() {}

    /**
     * Single source of truth for each permission row. Add conjuncts with
     * {@code PermissionRule.allOf(first, second, ...)} when a permission needs role <em>and</em> tier checks.
     */
    private static List<PermissionRule> rulesFor(Permission permission) {
        return switch (permission) {
            // User profile
            case USER_SELF_READ, USER_SELF_WRITE -> PermissionRule.allOf(Patterns.loggedInCustomer());

            // Workflow
            case WORKFLOW_READ -> PermissionRule.allOf(Patterns.loggedInCustomer());
            case WORKFLOW_WRITE -> PermissionRule.allOf(Patterns.loggedInStaff());

            // Org / moderation
            case TEAM_MANAGE, ROOM_MODERATE -> PermissionRule.allOf(Patterns.loggedInStaff());
            case ORG_ADMIN_ACTIONS -> PermissionRule.allOf(Patterns.orgAdminOnly());

            // Platform operator
            case PLATFORM_AUDIT_READ, PLATFORM_CONFIG_WRITE -> PermissionRule.allOf(Patterns.platformAdminOnly());
        };
    }

    public static List<PermissionRule> rules(Permission permission) {
        return RULES.get(permission);
    }

    /**
     * For tests or feature flags: replace one row. Not synchronized.
     */
    public static void replaceRow(Permission permission, List<PermissionRule> conjuncts) {
        if (conjuncts == null || conjuncts.isEmpty()) {
            throw new IllegalArgumentException("conjuncts must not be null or empty");
        }
        RULES.put(permission, List.copyOf(conjuncts));
    }

    /** Restore the built-in row from {@link #rulesFor(Permission)}. */
    public static void resetRow(Permission permission) {
        RULES.put(permission, rulesFor(permission));
    }

    /**
     * @param platformAdmin true when JWT marks user as platform admin ({@code is_admin} or {@link SystemRole#ADMIN})
     */
    public static boolean isGranted(
            Permission permission,
            SystemRole systemRole,
            BusinessRole businessRole,
            UserTier userTier,
            boolean platformAdmin) {

        if (platformAdmin || systemRole == SystemRole.ADMIN) {
            return true;
        }

        List<PermissionRule> conjuncts = RULES.get(permission);
        if (conjuncts == null || conjuncts.isEmpty()) {
            return false;
        }

        UserTier tier = userTier != null ? userTier : UserTier.FREE;
        return conjuncts.stream().allMatch(r -> r.matches(systemRole, businessRole, tier));
    }

    /** Unmodifiable copy for debugging or admin diagnostics. */
    public static Map<Permission, List<PermissionRule>> snapshot() {
        return Map.copyOf(RULES);
    }
}
