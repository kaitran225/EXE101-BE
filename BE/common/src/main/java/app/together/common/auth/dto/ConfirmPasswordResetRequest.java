package app.together.common.auth.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import app.together.common.shared.util.ValidPassword;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConfirmPasswordResetRequest {
    @NotBlank(message = "Token is required")
    @JsonAlias({"resetToken", "code"})
    private String token;


    @NotBlank(message = "New password is required")
    @JsonAlias({"password", "new_password"})
    @ValidPassword
    private String newPassword;
}
