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

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
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
public class TaskDto extends BaseAuditDTO {
    Long taskId;
    Long projectId;
    Long teamId;
    Long roomId;
    Long parentTaskId;
    @NotBlank(message = "title required")
    @Size(max = 500)
    String title;
    @Size(max = 5000)
    String description;
    String status;
    String priority;
    BigDecimal estimatedHours;
    BigDecimal actualHours;
    LocalDate startDate;
    LocalDate dueDate;
    Instant completedAt;

}
