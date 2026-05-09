package app.together.common.auth.dto;

import app.together.common.auth.enums.WalletStatus;
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
public class UserWalletDto {
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
