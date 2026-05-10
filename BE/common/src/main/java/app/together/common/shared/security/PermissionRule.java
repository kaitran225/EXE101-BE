package app.together.common.shared.security;

import app.together.common.auth.enums.BusinessRole;
import app.together.common.auth.enums.SystemRole;
import app.together.common.auth.enums.UserTier;

import java.util.EnumSet;
import java.util.List;
import java.util.Set;

/**
 * One conjunct in the permission matrix: caller must match every <em>non-empty</em> role/tier set
 * (AND within this record). For a {@link Permission}, the matrix stores a list of rules; access is
 * granted only when <strong>every</strong> rule in that list {@link #matches matches} (AND across rules).
 * <p>
 * Empty set on an axis means no constraint on that axis.
 */
public record PermissionRule(Set<SystemRole> systemRoles, Set<BusinessRole> businessRoles, Set<UserTier> userTiers) {

    public PermissionRule {
        systemRoles = systemRoles == null || systemRoles.isEmpty()
                ? EnumSet.noneOf(SystemRole.class)
                : EnumSet.copyOf(systemRoles);
        businessRoles = businessRoles == null || businessRoles.isEmpty()
                ? EnumSet.noneOf(BusinessRole.class)
                : EnumSet.copyOf(businessRoles);
        userTiers = userTiers == null || userTiers.isEmpty()
                ? EnumSet.noneOf(UserTier.class)
                : EnumSet.copyOf(userTiers);
    }

    /**
     * All of these rules must match (use in {@link PermissionMatrix} row definitions).
     */
    public static List<PermissionRule> allOf(PermissionRule first, PermissionRule... rest) {
        if (rest.length == 0) {
            return List.of(first);
        }
        PermissionRule[] all = new PermissionRule[rest.length + 1];
        all[0] = first;
        System.arraycopy(rest, 0, all, 1, rest.length);
        return List.of(all);
    }

    public static PermissionRule of(
            Set<SystemRole> systemRoles,
            Set<BusinessRole> businessRoles,
            Set<UserTier> userTiers) {
        return new PermissionRule(systemRoles, businessRoles, userTiers);
    }

    public static PermissionRule systemOnly(SystemRole first, SystemRole... rest) {
        return new PermissionRule(EnumSet.of(first, rest), EnumSet.noneOf(BusinessRole.class), EnumSet.noneOf(UserTier.class));
    }

    public static PermissionRule businessOnly(BusinessRole first, BusinessRole... rest) {
        return new PermissionRule(EnumSet.noneOf(SystemRole.class), EnumSet.of(first, rest), EnumSet.noneOf(UserTier.class));
    }

    public static PermissionRule tierOnly(UserTier first, UserTier... rest) {
        return new PermissionRule(EnumSet.noneOf(SystemRole.class), EnumSet.noneOf(BusinessRole.class), EnumSet.of(first, rest));
    }

    public static PermissionRule systemAndBusiness(Set<SystemRole> systems, Set<BusinessRole> businesses) {
        return new PermissionRule(
                systems == null ? EnumSet.noneOf(SystemRole.class) : EnumSet.copyOf(systems),
                businesses == null ? EnumSet.noneOf(BusinessRole.class) : EnumSet.copyOf(businesses),
                EnumSet.noneOf(UserTier.class));
    }

    public boolean matches(SystemRole systemRole, BusinessRole businessRole, UserTier userTier) {
        boolean sysOk = systemRoles.isEmpty() || (systemRole != null && systemRoles.contains(systemRole));
        boolean bizOk = businessRoles.isEmpty() || (businessRole != null && businessRoles.contains(businessRole));
        boolean tierOk = userTiers.isEmpty() || (userTier != null && userTiers.contains(userTier));
        return sysOk && bizOk && tierOk;
    }
}
