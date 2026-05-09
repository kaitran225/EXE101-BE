package app.together.common.workflow.entity;

import app.together.common.shared.persistence.BaseAuditEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "user_room_slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class UserRoomSlot extends BaseAuditEntity {

    @Id
    @Column(name = "user_sso")
    @EqualsAndHashCode.Include
    String userSso;

    @Column(name = "total_slots")
    Integer totalSlots;

    @Column(name = "used_slots")
    Integer usedSlots;
}
