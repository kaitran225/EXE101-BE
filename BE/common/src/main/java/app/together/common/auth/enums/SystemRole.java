package app.together.common.auth.enums;

/**
 * Platform / access-control role (Spring Security authorities use {@code ROLE_*}).
 */
public enum SystemRole {

    USER,
    ADMIN;

    public String springAuthority() {
        return "ROLE_" + name();
    }
}
