package app.together.common.auth.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private long expiresIn;
    private long refreshTokenExpiresIn;
    private String plan_type;
    private int exp;
    /** Platform role (matches JWT claim {@code system_role}). */
    private String systemRole;
    /** Domain role (matches JWT claim {@code business_role}). */
    private String businessRole;
}
