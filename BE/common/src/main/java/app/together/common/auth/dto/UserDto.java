package app.together.common.auth.dto;

import app.together.common.shared.dto.BaseAuditDTO;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import app.together.common.auth.enums.BusinessRole;
import app.together.common.auth.enums.SystemRole;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto extends BaseAuditDTO {
    Long userId;
    @NotBlank(message = "userSso required")
    @Size(max = 255)
    String userSso;
    @NotBlank(message = "email required")
    @Email
    @Size(max = 255)
    String email;
    @Size(max = 255)
    String fullName;
    @Size(max = 2048)
    String avatarUrl;
    String planType;
    Instant planExpiresAt;
    Integer exp;
    Integer level;
    Integer streak;
    Integer longestStreak;
    LocalDate lastActiveDate;
    String status;
    Boolean emailVerified;
    SystemRole systemRole;
    BusinessRole businessRole;
    Boolean isAdmin;
}
