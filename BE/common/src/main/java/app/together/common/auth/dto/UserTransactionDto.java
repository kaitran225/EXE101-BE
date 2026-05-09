package app.together.common.auth.dto;

import app.together.common.shared.enums.TransactionType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserTransactionDto {
    Long userTransactionId;
    Long userId;
    Long walletId;
    Integer amount;
    Integer balanceAfter;
    TransactionType type;
    String referenceType;
    String referenceId;
    String description;
    String metadata;

}
