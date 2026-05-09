package app.together.common.auth.enums;

/**
 * Domain / product role (authorization rules, entitlements, UI). Not a Spring {@code ROLE_*} by default.
 */
public enum BusinessRole {

    MEMBER,
    STUDENT,
    TEACHER,
    ORG_ADMIN
}
