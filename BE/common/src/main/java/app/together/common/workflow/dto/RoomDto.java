package app.together.common.workflow.dto;

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
public class RoomDto extends BaseAuditDTO {
    Long roomId;
    String title;
    String description;
    String goalDescription;
    Integer goalDurationDays;
    Integer maxMembers;
    Boolean isPremium;
    Boolean isPublic;
    String inviteCode;
    String status;
    Instant activatedAt;
    Instant expiresAt;

}
