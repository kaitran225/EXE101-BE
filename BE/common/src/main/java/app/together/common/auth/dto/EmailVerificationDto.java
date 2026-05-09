package app.together.common.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class EmailVerificationDto {
    Long verificationId;
    Long userId;
    String email;
    String verificationCode;
    Boolean isEduEmail;
    Instant verifiedAt;
    Instant expiresAt;
    Integer attempts;

}
