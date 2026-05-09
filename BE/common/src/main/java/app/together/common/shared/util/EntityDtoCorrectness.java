package app.together.common.shared.util;

import app.together.common.workflow.dto.AchievementDto;
import app.together.common.workflow.dto.AppConfigDto;
import app.together.common.workflow.dto.AuditLogDto;
import app.together.common.workflow.dto.ChatConversationDto;
import app.together.common.workflow.dto.ChatMessageDto;
import app.together.common.workflow.dto.CoinPackageDto;
import app.together.common.workflow.dto.DocumentDto;
import app.together.common.auth.dto.EmailVerificationDto;
import app.together.common.workflow.dto.FlashcardDto;
import app.together.common.workflow.dto.FlashcardReviewDto;
import app.together.common.workflow.dto.MeetingDto;
import app.together.common.workflow.dto.MeetingNoteDto;
import app.together.common.workflow.dto.MeetingParticipantDto;
import app.together.common.workflow.dto.MeetingSummaryDto;
import app.together.common.workflow.dto.MindmapDto;
import app.together.common.workflow.dto.NotificationDto;
import app.together.common.auth.dto.OAuthAccountDto;
import app.together.common.auth.dto.PasswordResetDto;
import app.together.common.workflow.dto.PaymentTransactionDto;
import app.together.common.workflow.dto.ProjectDto;
import app.together.common.workflow.dto.QuickNoteDto;
import app.together.common.workflow.dto.QuizAnalyticsDto;
import app.together.common.workflow.dto.QuizAttemptDto;
import app.together.common.workflow.dto.QuizDto;
import app.together.common.workflow.dto.QuizQuestionDto;
import app.together.common.auth.dto.RefreshTokenDto;
import app.together.common.workflow.dto.RoomActivityDto;
import app.together.common.workflow.dto.RoomDto;
import app.together.common.workflow.dto.RoomMemberDto;
import app.together.common.workflow.dto.RoomPostDto;
import app.together.common.workflow.dto.RoomRequestDto;
import app.together.common.workflow.dto.ScheduleCategoryDto;
import app.together.common.workflow.dto.ScheduleDto;
import app.together.common.workflow.dto.ScheduleExceptionDto;
import app.together.common.workflow.dto.StudySessionDto;
import app.together.common.workflow.dto.SummaryDto;
import app.together.common.workflow.dto.TaskActivityDto;
import app.together.common.workflow.dto.TaskAssignmentDto;
import app.together.common.workflow.dto.TaskAttachmentDto;
import app.together.common.workflow.dto.TaskCommentDto;
import app.together.common.workflow.dto.TaskDependencyDto;
import app.together.common.workflow.dto.TaskDto;
import app.together.common.workflow.dto.TeamDto;
import app.together.common.workflow.dto.TeamMemberDto;
import app.together.common.workflow.dto.TransactionDto;
import app.together.common.workflow.dto.UserAchievementDto;
import app.together.common.auth.dto.UserDto;
import app.together.common.workflow.dto.UserMasterDataDto;
import app.together.common.auth.dto.UserPreferencesDto;
import app.together.common.workflow.dto.UserRoomSlotDto;
import app.together.common.auth.dto.UserTransactionDto;
import app.together.common.auth.dto.UserWalletDto;
import app.together.common.auth.entity.EmailVerification;
import app.together.common.auth.entity.OAuthAccount;
import app.together.common.auth.entity.PasswordReset;
import app.together.common.auth.entity.RefreshToken;
import app.together.common.auth.entity.User;
import app.together.common.auth.entity.UserPreferences;
import app.together.common.auth.entity.UserTransaction;
import app.together.common.auth.entity.UserWallet;
import app.together.common.workflow.entity.Achievement;
import app.together.common.workflow.entity.AppConfig;
import app.together.common.workflow.entity.AuditLog;
import app.together.common.workflow.entity.ChatConversation;
import app.together.common.workflow.entity.ChatMessage;
import app.together.common.workflow.entity.CoinPackage;
import app.together.common.workflow.entity.Document;
import app.together.common.workflow.entity.Flashcard;
import app.together.common.workflow.entity.FlashcardReview;
import app.together.common.workflow.entity.Meeting;
import app.together.common.workflow.entity.MeetingNote;
import app.together.common.workflow.entity.MeetingParticipant;
import app.together.common.workflow.entity.MeetingSummary;
import app.together.common.workflow.entity.Mindmap;
import app.together.common.workflow.entity.Notification;
import app.together.common.workflow.entity.PaymentTransaction;
import app.together.common.workflow.entity.Project;
import app.together.common.workflow.entity.QuickNote;
import app.together.common.workflow.entity.Quiz;
import app.together.common.workflow.entity.QuizAnalytics;
import app.together.common.workflow.entity.QuizAttempt;
import app.together.common.workflow.entity.QuizQuestion;
import app.together.common.workflow.entity.Room;
import app.together.common.workflow.entity.RoomActivity;
import app.together.common.workflow.entity.RoomMember;
import app.together.common.workflow.entity.RoomPost;
import app.together.common.workflow.entity.RoomRequest;
import app.together.common.workflow.entity.Schedule;
import app.together.common.workflow.entity.ScheduleCategory;
import app.together.common.workflow.entity.ScheduleException;
import app.together.common.workflow.entity.StudySession;
import app.together.common.workflow.entity.Summary;
import app.together.common.workflow.entity.Task;
import app.together.common.workflow.entity.TaskActivity;
import app.together.common.workflow.entity.TaskAssignment;
import app.together.common.workflow.entity.TaskAttachment;
import app.together.common.workflow.entity.TaskComment;
import app.together.common.workflow.entity.TaskDependency;
import app.together.common.workflow.entity.Team;
import app.together.common.workflow.entity.TeamMember;
import app.together.common.workflow.entity.Transaction;
import app.together.common.workflow.entity.UserAchievement;
import app.together.common.workflow.entity.UserMasterData;
import app.together.common.workflow.entity.UserRoomSlot;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** Entity/DTO/mapper correctness checks. */
public final class EntityDtoCorrectness {

    private static final Set<String> EXPECTED_TABLES = Set.of(
        "users", "schedule_categories", "coin_packages", "email_verifications",
        "user_master_data", "achievements", "user_achievements", "user_room_slots", "oauth_accounts", "refresh_tokens", "user_wallets", "user_transactions", "transactions",
        "password_resets", "user_preferences", "payment_transactions",
        "chat_conversations", "chat_messages", "rooms", "room_requests",
        "room_members", "room_posts", "study_sessions", "room_activities", "documents", "summaries",
        "flashcard_reviews", "mindmaps", "quizzes", "quiz_questions", "flashcards", "quiz_attempts",
        "quiz_analytics", "schedules", "schedule_exceptions", "quick_notes", "teams", "team_members",
        "projects", "tasks", "task_assignments", "task_dependencies", "task_comments", "task_activities",
        "task_attachments", "meetings", "meeting_participants", "meeting_summaries", "meeting_notes",
        "notifications", "audit_logs", "app_config"
    );

    @SuppressWarnings("rawtypes")
    private static final List<Class<?>> ENTITY_CLASSES = List.of(
        User.class, ScheduleCategory.class, CoinPackage.class, EmailVerification.class,
        UserMasterData.class, Achievement.class, UserAchievement.class, UserRoomSlot.class, OAuthAccount.class, RefreshToken.class, UserWallet.class, UserTransaction.class, Transaction.class,
        PasswordReset.class, UserPreferences.class, PaymentTransaction.class,
        ChatConversation.class, ChatMessage.class, Room.class, RoomRequest.class,
        RoomMember.class, RoomPost.class, StudySession.class, RoomActivity.class, Document.class, Summary.class,
        FlashcardReview.class, Mindmap.class, Quiz.class, QuizQuestion.class, Flashcard.class, QuizAttempt.class,
        QuizAnalytics.class, Schedule.class, ScheduleException.class, QuickNote.class, Team.class, TeamMember.class,
        Project.class, Task.class, TaskAssignment.class, TaskDependency.class, TaskComment.class, TaskActivity.class,
        TaskAttachment.class, Meeting.class, MeetingParticipant.class, MeetingSummary.class, MeetingNote.class,
        Notification.class, AuditLog.class, AppConfig.class
    );

    @SuppressWarnings("rawtypes")
    private static final List<Class<?>> DTO_CLASSES = List.of(
        UserDto.class, ScheduleCategoryDto.class, CoinPackageDto.class, EmailVerificationDto.class,
        UserMasterDataDto.class, AchievementDto.class, UserAchievementDto.class, UserRoomSlotDto.class, OAuthAccountDto.class, RefreshTokenDto.class, UserWalletDto.class, UserTransactionDto.class, TransactionDto.class,
        PasswordResetDto.class, UserPreferencesDto.class, PaymentTransactionDto.class,
        ChatConversationDto.class, ChatMessageDto.class, RoomDto.class, RoomRequestDto.class,
        RoomMemberDto.class, RoomPostDto.class, StudySessionDto.class, RoomActivityDto.class, DocumentDto.class, SummaryDto.class,
        FlashcardReviewDto.class, MindmapDto.class, QuizDto.class, QuizQuestionDto.class, FlashcardDto.class, QuizAttemptDto.class,
        QuizAnalyticsDto.class, ScheduleDto.class, ScheduleExceptionDto.class, QuickNoteDto.class, TeamDto.class, TeamMemberDto.class,
        ProjectDto.class, TaskDto.class, TaskAssignmentDto.class, TaskDependencyDto.class, TaskCommentDto.class, TaskActivityDto.class,
        TaskAttachmentDto.class, MeetingDto.class, MeetingParticipantDto.class, MeetingSummaryDto.class, MeetingNoteDto.class,
        NotificationDto.class, AuditLogDto.class, AppConfigDto.class
    );

    /** Mapper -> entity for toDto check. */
    @SuppressWarnings("rawtypes")
    private static final Map<Class<?>, Class<?>> MAPPER_TO_ENTITY = Map.ofEntries(
        map(app.together.common.auth.mapper.UserMapper.class, User.class),
        map(app.together.common.workflow.mapper.AchievementMapper.class, Achievement.class),
        map(app.together.common.workflow.mapper.ScheduleCategoryMapper.class, ScheduleCategory.class),
        map(app.together.common.workflow.mapper.CoinPackageMapper.class, CoinPackage.class),
        map(app.together.common.auth.mapper.EmailVerificationMapper.class, EmailVerification.class),
        map(app.together.common.workflow.mapper.UserMasterDataMapper.class, UserMasterData.class),
        map(app.together.common.auth.mapper.OAuthAccountMapper.class, OAuthAccount.class),
        map(app.together.common.auth.mapper.RefreshTokenMapper.class, RefreshToken.class),
        map(app.together.common.auth.mapper.UserWalletMapper.class, UserWallet.class),
        map(app.together.common.auth.mapper.UserTransactionMapper.class, UserTransaction.class),
        map(app.together.common.workflow.mapper.TransactionMapper.class, Transaction.class),
        map(app.together.common.workflow.mapper.UserAchievementMapper.class, UserAchievement.class),
        map(app.together.common.auth.mapper.PasswordResetMapper.class, PasswordReset.class),
        map(app.together.common.auth.mapper.UserPreferencesMapper.class, UserPreferences.class),
        map(app.together.common.workflow.mapper.PaymentTransactionMapper.class, PaymentTransaction.class),
        map(app.together.common.workflow.mapper.ChatConversationMapper.class, ChatConversation.class),
        map(app.together.common.workflow.mapper.ChatMessageMapper.class, ChatMessage.class),
        map(app.together.common.workflow.mapper.UserRoomSlotMapper.class, UserRoomSlot.class),
        map(app.together.common.workflow.mapper.RoomMapper.class, Room.class),
        map(app.together.common.workflow.mapper.RoomRequestMapper.class, RoomRequest.class),
        map(app.together.common.workflow.mapper.RoomMemberMapper.class, RoomMember.class),
        map(app.together.common.workflow.mapper.RoomPostMapper.class, RoomPost.class),
        map(app.together.common.workflow.mapper.StudySessionMapper.class, StudySession.class),
        map(app.together.common.workflow.mapper.RoomActivityMapper.class, RoomActivity.class),
        map(app.together.common.workflow.mapper.DocumentMapper.class, Document.class),
        map(app.together.common.workflow.mapper.SummaryMapper.class, Summary.class),
        map(app.together.common.workflow.mapper.FlashcardReviewMapper.class, FlashcardReview.class),
        map(app.together.common.workflow.mapper.MindmapMapper.class, Mindmap.class),
        map(app.together.common.workflow.mapper.QuizMapper.class, Quiz.class),
        map(app.together.common.workflow.mapper.QuizQuestionMapper.class, QuizQuestion.class),
        map(app.together.common.workflow.mapper.FlashcardMapper.class, Flashcard.class),
        map(app.together.common.workflow.mapper.QuizAttemptMapper.class, QuizAttempt.class),
        map(app.together.common.workflow.mapper.QuizAnalyticsMapper.class, QuizAnalytics.class),
        map(app.together.common.workflow.mapper.ScheduleMapper.class, Schedule.class),
        map(app.together.common.workflow.mapper.ScheduleExceptionMapper.class, ScheduleException.class),
        map(app.together.common.workflow.mapper.QuickNoteMapper.class, QuickNote.class),
        map(app.together.common.workflow.mapper.TeamMapper.class, Team.class),
        map(app.together.common.workflow.mapper.TeamMemberMapper.class, TeamMember.class),
        map(app.together.common.workflow.mapper.ProjectMapper.class, Project.class),
        map(app.together.common.workflow.mapper.TaskMapper.class, Task.class),
        map(app.together.common.workflow.mapper.TaskAssignmentMapper.class, TaskAssignment.class),
        map(app.together.common.workflow.mapper.TaskDependencyMapper.class, TaskDependency.class),
        map(app.together.common.workflow.mapper.TaskCommentMapper.class, TaskComment.class),
        map(app.together.common.workflow.mapper.TaskActivityMapper.class, TaskActivity.class),
        map(app.together.common.workflow.mapper.TaskAttachmentMapper.class, TaskAttachment.class),
        map(app.together.common.workflow.mapper.MeetingMapper.class, Meeting.class),
        map(app.together.common.workflow.mapper.MeetingParticipantMapper.class, MeetingParticipant.class),
        map(app.together.common.workflow.mapper.MeetingSummaryMapper.class, MeetingSummary.class),
        map(app.together.common.workflow.mapper.MeetingNoteMapper.class, MeetingNote.class),
        map(app.together.common.workflow.mapper.NotificationMapper.class, Notification.class),
        map(app.together.common.workflow.mapper.AuditLogMapper.class, AuditLog.class),
        map(app.together.common.workflow.mapper.AppConfigMapper.class, AppConfig.class)
    );

    private static Map.Entry<Class<?>, Class<?>> map(Class<?> mapper, Class<?> entity) {
        return new AbstractMap.SimpleEntry<>(mapper, entity);
    }

    private EntityDtoCorrectness() {}

    public static List<String> checkAll() {
        List<String> errors = new ArrayList<>();
        checkEntities(errors);
        checkDtos(errors);
        checkMappers(errors);
        return errors;
    }

    private static void checkEntities(List<String> errors) {
        for (Class<?> clazz : ENTITY_CLASSES) {
            if (!clazz.isAnnotationPresent(Entity.class)) {
                errors.add("Missing @Entity: " + clazz.getSimpleName());
                continue;
            }
            Table t = clazz.getAnnotation(Table.class);
            String tableName = t != null ? t.name() : null;
            if (tableName == null || !EXPECTED_TABLES.contains(tableName)) {
                errors.add("Entity " + clazz.getSimpleName() + " has invalid or missing @Table(name): " + tableName);
            }
            try {
                Object o = tryInstantiate(clazz);
                if (o == null) errors.add("Could not instantiate entity: " + clazz.getSimpleName());
            } catch (Exception e) {
                errors.add("Entity instantiation failed " + clazz.getSimpleName() + ": " + e.getMessage());
            }
        }
    }

    private static void checkDtos(List<String> errors) {
        for (Class<?> dtoClass : DTO_CLASSES) {
            try {
                Object dto = tryInstantiate(dtoClass);
                if (dto == null) errors.add("Could not instantiate DTO: " + dtoClass.getSimpleName());
            } catch (Exception e) {
                errors.add("DTO instantiation failed " + dtoClass.getSimpleName() + ": " + e.getMessage());
            }
        }
    }

    private static void checkMappers(List<String> errors) {
        Map<Class<?>, Object> entityInstances = new HashMap<>();
        for (Class<?> ec : ENTITY_CLASSES) {
            try {
                entityInstances.put(ec, tryInstantiate(ec));
            } catch (Exception ignored) {}
        }
        for (Map.Entry<Class<?>, Class<?>> e : MAPPER_TO_ENTITY.entrySet()) {
            Class<?> mapperInterface = e.getKey();
            Class<?> entityClass = e.getValue();
            String implName = mapperInterface.getName() + "Impl";
            try {
                Class<?> implClass = Class.forName(implName);
                Object mapper = implClass.getDeclaredConstructor().newInstance();
                Object entity = entityInstances.get(entityClass);
                if (entity == null) continue;
                Method toDto = implClass.getMethod("toDto", entityClass);
                toDto.invoke(mapper, entity);
            } catch (ClassNotFoundException ex) {
                errors.add("Mapper impl not found (compile first): " + implName);
            } catch (Exception ex) {
                errors.add("Mapper " + mapperInterface.getSimpleName() + " toDto failed: " + ex.getMessage());
            }
        }
    }

    private static Object tryInstantiate(Class<?> clazz) throws Exception {
        try {
            Constructor<?> c = clazz.getDeclaredConstructor();
            c.setAccessible(true);
            return c.newInstance();
        } catch (NoSuchMethodException ignored) {
            Object builder = clazz.getMethod("builder").invoke(null);
            return builder.getClass().getMethod("build").invoke(builder);
        }
    }
}
