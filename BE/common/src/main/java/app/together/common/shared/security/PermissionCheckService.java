package app.together.common.shared.security;

import app.together.common.auth.enums.BusinessRole;
import app.together.common.auth.enums.SystemRole;
import app.together.common.auth.enums.UserTier;
import app.together.common.shared.constant.ErrorCodes;
import app.together.common.shared.constant.MessageConstants;
import app.together.common.shared.exception.ForbiddenException;
import app.together.common.shared.util.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Validates {@link Permission} against the static {@link PermissionMatrix} for the current principal
 * or explicit roles/tier.
 */
@Service
public class PermissionCheckService {

    /** Matrix check using explicit roles (e.g. tests or async without security context). */
    public boolean check(
            Permission permission,
            SystemRole systemRole,
            BusinessRole businessRole,
            UserTier userTier,
            boolean platformAdmin) {
        return PermissionMatrix.isGranted(permission, systemRole, businessRole, userTier, platformAdmin);
    }

    /** Matrix check for the current JWT / security context. */
    public boolean checkCurrentUser(Permission permission) {
        Optional<SystemRole> sys = SecurityUtils.getCurrentSystemRole();
        Optional<BusinessRole> biz = SecurityUtils.getCurrentBusinessRole();
        UserTier tier = SecurityUtils.getCurrentUserTier().orElse(UserTier.FREE);
        boolean admin = SecurityUtils.isSystemAdmin();
        return PermissionMatrix.isGranted(
                permission,
                sys.orElse(null),
                biz.orElse(null),
                tier,
                admin);
    }

    /**
     * Validates permission for current user; throws {@link ForbiddenException} if denied.
     */
    public void requireCurrentUser(Permission permission) {
        if (!checkCurrentUser(permission)) {
            throw new ForbiddenException(
                    MessageConstants.MESSAGE_PERMISSION_DENIED,
                    ErrorCodes.PERMISSION_DENIED);
        }
    }

    /**
     * Validates permission for explicit roles; throws {@link ForbiddenException} if denied.
     */
    public void require(
            Permission permission,
            SystemRole systemRole,
            BusinessRole businessRole,
            UserTier userTier,
            boolean platformAdmin) {
        if (!check(permission, systemRole, businessRole, userTier, platformAdmin)) {
            throw new ForbiddenException(
                    MessageConstants.MESSAGE_PERMISSION_DENIED,
                    ErrorCodes.PERMISSION_DENIED);
        }
    }
}
