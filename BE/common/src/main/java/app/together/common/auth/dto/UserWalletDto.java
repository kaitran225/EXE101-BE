package app.together.common.auth.dto;

import app.together.common.shared.dto.BaseAuditDTO;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;


import app.together.common.auth.enums.WalletStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserWalletDto extends BaseAuditDTO {
    Long walletId;
    Long userId;
    Integer balance;
    Integer bonusBalance;
    Integer pendingBalance;
    Integer lifetimeEarned;
    Integer lifetimeSpent;
    Instant lastTransactionAt;
    WalletStatus status;
    Long version;
    String metadata;

}
