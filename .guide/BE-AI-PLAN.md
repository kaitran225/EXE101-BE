# EXE101 Backend & AI Integration Plan

Based on [SRS](.guide/SRS.md) and [original.sql](.guide/original.sql).

## 1. Backend Architecture (Current + Target)

### 1.1 Modules (existing)
| Module   | Purpose                                      | DB / AI |
|----------|----------------------------------------------|---------|
| **common** | Shared DTOs, exceptions, config, security, **AI client** | —       |
| **auth**   | OAuth2 AS, users, refresh tokens             | users, oauth_accounts, refresh_tokens, etc. |
| **read**   | Documents, schedules, quizzes, content       | documents, summaries, quizzes, schedules, etc. |
| **workflow** | Rooms, teams, tasks, meetings              | rooms, tasks, meetings, etc. |

### 1.2 AI Integration Strategy (lightweight first)
- **Phase 1 (now):** Use a **lightweight model** for all AI features to control cost and latency.
  - Prefer **Gemini 2.0 Flash** or **OpenAI GPT-4o-mini** via REST API (configurable in `common`).
  - Single **AI client abstraction** in `common` so auth/read/workflow stay provider-agnostic.
- **Phase 2 (later):** Optional swap to stronger models for specific flows (e.g. meeting summary) without changing service code.

---

## 2. Common Module – Implement as Much as Possible

Shared code used by auth, read, workflow (and any future AI-heavy service).

### 2.1 Already present
- `dto.ApiResponse<T>`
- `exception.GlobalExceptionHandler`
- `config.SecurityConfig` (OAuth2 resource server, health public)

### 2.2 To add (priority)

| Area        | Files / Content |
|------------|------------------|
| **Exceptions** | `ResourceNotFoundException`, `BadRequestException` (with `errorCode`); extend `GlobalExceptionHandler` to map them to 404/400 and `ApiResponse`. |
| **Error codes** | `ErrorCodes` (constants) for consistent `errorCode` in responses. |
| **Pagination** | `PageResponse<T>`, `PageRequest` (page, size, sort) for list APIs. |
| **Base entity** | `BaseAuditEntity` (created_at, updated_at, created_by, updated_by) for entities that follow DB audit columns. |
| **Validation** | Reuse `@Valid` + Bean Validation; optional custom annotations if needed. |
| **AI client** | `AiClient` interface (e.g. `generateText(String prompt)` / `generateText(String systemPrompt, String userPrompt)`); one impl: **lightweight HTTP client** (e.g. Gemini Flash or GPT-4o-mini) with config: `ai.provider`, `ai.api-key`, `ai.model` (e.g. `gemini-2.0-flash`). |
| **Config** | `application-common.yaml`: add `ai.*` placeholders; each service can override. |

### 2.3 Optional in common (later)
- JWT claims helper (if multiple services need to read `user_sso` from JWT).
- Idempotency key handling for AI/upload APIs.
- Retry/circuit-breaker config for AI HTTP calls (e.g. Resilience4j).

---

## 3. Domain vs SQL Mapping (high level)

| Domain        | Main tables (from original.sql) | Service(s) | AI usage |
|---------------|----------------------------------|------------|----------|
| Users / Auth  | users, oauth_accounts, refresh_tokens, user_preferences, password_resets, email_verifications | auth       | —        |
| Documents     | documents, summaries             | read       | Summary, mindmap, quiz gen |
| Quizzes       | quizzes, quiz_questions, flashcards, quiz_attempts, quiz_analytics | read       | Generate questions; analyze mistakes |
| Schedules     | schedules, schedule_categories, schedule_exceptions | read       | Chatbot: “add exam X in N days” → create schedule |
| Chat          | chat_conversations, chat_messages | read (or dedicated) | Chat completion (lightweight model) |
| Rooms / Social | rooms, room_members, room_posts, room_requests, study_sessions, room_activities | workflow   | Matching (optional later) |
| Teams / Tasks | teams, team_members, projects, tasks, task_assignments, task_comments, task_activities | workflow   | —        |
| Meetings      | meetings, meeting_participants, meeting_summaries, meeting_notes | workflow   | **Meeting summary** → key points, action items, suggested tasks |
| Wallets / Pay | user_wallets, transactions, coin_packages, payment_transactions | auth or dedicated | —        |
| Notifications | notifications                   | workflow or shared | —        |

---

## 4. BE Development Phases

### Phase 1 – Foundation (current focus)
1. **Common**
   - Add exceptions, `ErrorCodes`, `PageResponse`/`PageRequest`, `BaseAuditEntity`.
   - Add **AI client** (interface + lightweight model impl, config).
2. **Auth**
   - Complete user CRUD, OAuth2 issuance, refresh; align entities with `users`, `oauth_accounts`, `refresh_tokens`.
3. **Read**
   - Documents: upload metadata, processing_status; **AI summary** (call common AI client).
   - Quizzes: create from document (AI-generated questions via lightweight model).
   - Schedules: CRUD; later: chatbot endpoint that uses AI to create/update schedule entries.
4. **Workflow**
   - Rooms/teams/tasks CRUD; meetings CRUD.
   - **Meeting summary**: on meeting end or manual trigger, call AI client → fill `meeting_summaries` (key_points, action_items, etc.); optional “suggest tasks” that create records in `tasks`.

### Phase 2 – Deeper integration
- Chat: persist `chat_conversations` / `chat_messages`; endpoint that streams or returns one reply using AI client.
- Quiz analytics: use AI to derive `weak_topics`, `recommendations` from attempt history.
- Schedule chatbot: NL → create/update schedule items (with safety checks).

### Phase 3 – Scale & optimize
- Optional swap to heavier model only for meeting summary or quiz generation.
- Caching for AI responses where idempotent (e.g. document summary by document_id).
- Rate limiting and cost controls per user/plan.

---

## 5. Lightweight Model Configuration (common)

Recommended for **now** (cost + speed):

- **Option A:** Google **Gemini 2.0 Flash** (`gemini-2.0-flash` or latest flash) via Generative Language API.
- **Option B:** **OpenAI GPT-4o-mini** via Chat Completions API.

In `application-common.yaml` (or env):

```yaml
ai:
  provider: gemini   # or openai
  model: gemini-2.0-flash
  api-key: ${AI_API_KEY:}
  base-url: ${AI_BASE_URL:}  # optional override
```

Implementation in **common**: one `AiClient` interface, one impl (e.g. `GeminiAiClient`) that uses `RestTemplate` or `WebClient` and the above config. Services only depend on `AiClient`.

---

## 6. Checklist – Common Files to Implement

- [x] `ApiResponse`, `GlobalExceptionHandler`, `SecurityConfig`
- [ ] `ResourceNotFoundException`, `BadRequestException`
- [ ] `ErrorCodes`
- [ ] `PageResponse<T>`, `PageRequest`
- [ ] `BaseAuditEntity`
- [ ] `AiClient` interface
- [ ] `GeminiAiClient` (or `LightweightAiClient`) + `AiClientConfig`
- [ ] `application-common.yaml` – `ai.*` config

After this, auth/read/workflow can rely on common for responses, pagination, exceptions, and all AI calls through a single, lightweight-model-backed client.
