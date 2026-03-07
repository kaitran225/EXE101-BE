# Frontend Guide & UI Design Checklist

This checklist verifies FE implementation against [.front_end_guide](.front_end_guide/) (JSX design exports) and [.UI-design](.UI-design/) (PNG mockups). All user-facing copy is in **English**.

---

## Quick verification: 30-page checklist

Use this table for pass/fail verification per page. For each row: open the **Route**, confirm route and FE page exist, page renders with expected layout, key elements are present, copy is in English. Mark status: `[x]` verified, `[~]` implemented not verified, `[ ]` not done.

| #   | Guide file                  | UI design                                   | Route                   | FE page                   | Status |
| --- | --------------------------- | ------------------------------------------- | ----------------------- | ------------------------- | ------ |
| 1   | welcome.jsx                 | 1. Welcome, Login Interface.png             | /welcome                | Welcome.tsx               | [ ]    |
| 2   | sign-up.jsx                 | 2. Sign up Interface.png                    | /sign-up                | SignUp.tsx                | [ ]    |
| 3   | confirm-mail.jsx            | 3. Confirm mail Interface.png               | /confirm-mail           | ConfirmMail.tsx           | [ ]    |
| 4   | reset-password.jsx          | 4. Reset password Interface.png             | /reset-password         | ResetPassword.tsx         | [ ]    |
| 5   | dashboard.jsx               | 6. Dashboard (home).png                     | /dashboard              | Dashboard.tsx             | [ ]    |
| 6   | study-room-discovery.jsx    | Social.png                                  | /study-rooms            | StudyRoomDiscovery.tsx    | [ ]    |
| 7   | create-new-room-study.jsx   | 15 create new room study.png                | /study-rooms/create-new | CreateNewRoomStudy.tsx    | [ ]    |
| 8   | recommend-room-matching.jsx | 13 Recommend matching.png                   | /study-rooms/recommend  | RecommendRoomMatching.tsx | [ ]    |
| 9   | study-room.jsx              | 14 Study room.png                           | /study-room             | StudyRoom.tsx             | [ ]    |
| 10  | study-room-dashboard.jsx    | 12 Study room dashboard.png                 | /study-room-dashboard   | StudyRoomDashboard.tsx    | [ ]    |
| 11  | focus-room.jsx              | 9.2 Focus room.png                          | /focus-room             | FocusRoom.tsx             | [ ]    |
| 12  | main-meeting-board.jsx      | 18  Main.png, Meeting.png, Meeting có AI.png | /meetings               | MainMeetingBoard.tsx      | [ ]    |
| 13  | all-teams.jsx               | 16 All Teams.png                            | /teams                  | AllTeams.tsx              | [ ]    |
| 14  | team-management.jsx         | Team.png, Teams.png                         | /team-management        | TeamManagement.tsx        | [ ]    |
| 15  | scrum-board.jsx             | 17 Scum board.png, Scum board.png           | /scrum-board            | ScrumBoard.tsx            | [ ]    |
| 16  | sprint-board.jsx            | 17 Sprint Board.png                         | /sprint-board           | SprintBoard.tsx           | [ ]    |
| 17  | sprint-member-board.jsx     | 17.1 Member.png                             | /sprint-member-board    | SprintMemberBoard.tsx     | [ ]    |
| 18  | meet-ai.jsx                 | Meeting có AI.png                           | /meet-ai                | MeetAi.tsx                | [ ]    |
| 19  | ai-support.jsx              | 9. AI Support.png                           | /ai-support             | AiSupport.tsx             | [ ]    |
| 20  | ai-support-attachment.jsx   | 9.1 AI Support.png                          | /ai-support-attachment  | AiSupportAttachment.tsx   | [ ]    |
| 21  | quizlet.jsx                 | 10. Quizlet.png                             | /quizlet                | Quizlet.tsx               | [ ]    |
| 22  | quizlet-result.jsx          | 10.1 Quizlet result.png                     | /quizlet-result         | QuizletResult.tsx         | [ ]    |
| 23  | profile-with-sidebar.jsx    | 7. Profile with sidebar.png                 | /profile                | ProfileWithSidebar.tsx    | [ ]    |
| 24  | personalize.jsx             | 5. Personalize.png                          | /personalize            | Personalize.tsx           | [ ]    |
| 25  | personalize_2.jsx           | 5.1 Personalize.png, 5.2 Personalize.png    | /personalize-2          | Personalize2.tsx          | [ ]    |
| 26  | personalize_3.jsx           | 5.2 Personalize.png                         | /personalize-3          | Personalize3.tsx          | [ ]    |
| 27  | calendar.jsx                | 11. Calendar.png                            | /calendar               | Calendar.tsx              | [ ]    |
| 28  | notification.jsx            | 8. Notification.png                         | /notifications          | Notification.tsx          | [ ]    |
| 29  | transaction.jsx             | 20 Transaction.png                          | /transaction            | Transaction.tsx           | [ ]    |
| 30  | subcription.jsx             | 21 Subscription.png                         | /subscription           | Subscription.tsx          | [ ]    |

**Not in the 30 (still implemented):**

| Guide file            | UI design            | Route               | FE page             | Note                           |
| --------------------- | -------------------- | ------------------- | ------------------- | ------------------------------ |
| create-room.jsx       | (same as #7)         | /study-rooms/create | CreateRoom.tsx      | Reuses CreateNewRoomStudy flow |
| focus-room-dialog.jsx | 9.2 Focus room-1.png | /focus-room-dialog  | FocusRoomDialog.tsx | Dialog overlay, not full page  |

**Routes summary (30-page set):** Standalone: `/login`, `/callback`, `/welcome`, `/sign-up`, `/confirm-mail`, `/reset-password`; `/` redirects to `/dashboard`. GuideLayout: all routes in the table from #5 onward (dashboard through subscription), plus `/study-rooms/create` and `/focus-room-dialog`.

---

## App shell

| Item | Guide / UI ref | FE implementation | Status |
|------|----------------|-------------------|--------|
| Global header (EXE101, nav links, Login) | Shown on auth/landing only | Renders only on `/`, `/login`, `/callback`, `/welcome`, `/sign-up`, `/confirm-mail`, `/reset-password` | [x] |
| No global header on app routes | Dashboard/Profile use sidebar + content header | Standalone paths check; guide routes use `GuideLayout` only | [x] |
| GuideLayout sidebar | dashboard.jsx, 7. Profile with sidebar.png | `GuideLayout.tsx`: ∞ together, Profile, Home, Study Rooms, Teams, Calendar, Subscription, Shop, Together AI; icons; violet active state | [x] |
| Sidebar footer | 6. Dashboard (home).png | Global ranking (placeholder user), Next reward progress bar | [x] |
| Content-area header | 6. Dashboard, 7. Profile | Search "Search...", settings, notifications, profile avatar, Focus Room button | [x] |
| All copy in English | — | Sidebar, header, and all pages use English labels and messages | [x] |

---

## 1. Master mapping table (32 guide files)

| Guide file | UI design ref(s) | Route | FE path | Status |
|------------|------------------|--------|---------|--------|
| welcome.jsx | 1. Welcome, Login Interface.png | /welcome | Welcome.tsx | [x] |
| sign-up.jsx | 2. Sign up Interface.png | /sign-up | SignUp.tsx | [x] |
| confirm-mail.jsx | 3. Confirm mail Interface.png | /confirm-mail | ConfirmMail.tsx | [x] |
| reset-password.jsx | 4. Reset password Interface.png | /reset-password | ResetPassword.tsx | [x] |
| dashboard.jsx | 6. Dashboard (home).png | /dashboard | Dashboard.tsx | [x] |
| study-room-discovery.jsx | Social.png | /study-rooms | StudyRoomDiscovery.tsx | [x] |
| create-room.jsx | (same as create-new-room-study) | /study-rooms/create | CreateRoom.tsx | [x] |
| create-new-room-study.jsx | 15 create new room study.png | /study-rooms/create-new | CreateNewRoomStudy.tsx | [x] |
| recommend-room-matching.jsx | 13 Recommend matching.png | /study-rooms/recommend | RecommendRoomMatching.tsx | [x] |
| study-room.jsx | 14 Study room.png | /study-room | StudyRoom.tsx | [x] |
| study-room-dashboard.jsx | 12 Study room dashboard.png | /study-room-dashboard | StudyRoomDashboard.tsx | [x] |
| focus-room.jsx | 9.2 Focus room.png | /focus-room | FocusRoom.tsx | [x] |
| focus-room-dialog.jsx | 9.2 Focus room-1.png | /focus-room-dialog | FocusRoomDialog.tsx | [x] |
| main-meeting-board.jsx | 18  Main.png, Meeting.png, Meeting có AI.png | /meetings | MainMeetingBoard.tsx | [x] |
| all-teams.jsx | 16 All Teams.png | /teams | AllTeams.tsx | [x] |
| team-management.jsx | Team.png, Teams.png | /team-management | TeamManagement.tsx | [x] |
| scrum-board.jsx | 17 Scum board.png, Scum board.png | /scrum-board | ScrumBoard.tsx | [x] |
| sprint-board.jsx | 17 Sprint Board.png | /sprint-board | SprintBoard.tsx | [x] |
| sprint-member-board.jsx | 17.1 Member.png | /sprint-member-board | SprintMemberBoard.tsx | [x] |
| meet-ai.jsx | Meeting có AI.png | /meet-ai | MeetAi.tsx | [x] |
| ai-support.jsx | 9. AI Support.png | /ai-support | AiSupport.tsx | [x] |
| ai-support-attachment.jsx | 9.1 AI Support.png | /ai-support-attachment | AiSupportAttachment.tsx | [x] |
| quizlet.jsx | 10. Quizlet.png | /quizlet | Quizlet.tsx | [x] |
| quizlet-result.jsx | 10.1 Quizlet result.png | /quizlet-result | QuizletResult.tsx | [x] |
| profile-with-sidebar.jsx | 7. Profile with sidebar.png | /profile | ProfileWithSidebar.tsx | [x] |
| personalize.jsx | 5. Personalize.png | /personalize | Personalize.tsx | [x] |
| personalize_2.jsx | 5.1 Personalize.png, 5.2 Personalize.png | /personalize-2 | Personalize2.tsx | [x] |
| personalize_3.jsx | 5.2 Personalize.png | /personalize-3 | Personalize3.tsx | [x] |
| calendar.jsx | 11. Calendar.png | /calendar | Calendar.tsx | [x] |
| notification.jsx | 8. Notification.png | /notifications | Notification.tsx | [x] |
| transaction.jsx | 20 Transaction.png, Transaction.png | /transaction | Transaction.tsx | [x] |
| subcription.jsx | 21 Subscription.png, Subscription.png | /subscription | Subscription.tsx | [x] |

---

## 2. Per-screen verification

For each guide, open the **Route** in the app and confirm the checks below. Use primary **UI design** PNG(s) for layout comparison (same sections and CTAs; no pixel-perfect).

### Auth & onboarding

**welcome.jsx** — `/welcome` → Welcome.tsx  
- **Key elements:** Hero "Learn together. Progress together."; login card: Log in, Welcome back, Continue with Facebook/Google, OR, Email, Password, Forgot password?, Log in, Sign up link.  
- **Check:** [ ] Page shows hero headline and login card. [ ] Email and Password inputs present. [ ] Log in and Sign up link present. [ ] Copy in English.

**sign-up.jsx** — `/sign-up` → SignUp.tsx  
- **Key elements:** Sign up, Welcome to your workspace!, Email, Password, Confirm password, Sign up button, Log in link.  
- **Check:** [ ] Sign up heading and form visible. [ ] Email, Password, Confirm password fields present. [ ] Sign up and Log in link present. [ ] Copy in English.

**confirm-mail.jsx** — `/confirm-mail` → ConfirmMail.tsx  
- **Key elements:** Forgot password, Email input, Send button, Back to log in.  
- **Check:** [ ] Forgot password context and email input present. [ ] Send and Back to log in present. [ ] Copy in English.

**reset-password.jsx** — `/reset-password` → ResetPassword.tsx  
- **Key elements:** Reset password, Password, Confirm password, Confirm button, Back to log in.  
- **Check:** [ ] Reset password heading and form visible. [ ] Password and Confirm password fields present. [ ] Confirm and Back to log in present. [ ] Copy in English.

### Dashboard & study rooms

**dashboard.jsx** — `/dashboard` → Dashboard.tsx  
- **Key elements:** Profile card; Services health; Study progress (XP); Open study rooms card with View study rooms, Create room, Get room recommendations.  
- **Check:** [ ] Dashboard shows within GuideLayout (sidebar + header). [ ] Profile and study progress / open study rooms section visible. [ ] View study rooms, Create room, Get room recommendations CTAs present. [ ] Copy in English.

**study-room-discovery.jsx** — `/study-rooms` → StudyRoomDiscovery.tsx  
- **Key elements:** Breadcrumbs; title + description; + Create Room; search; filters (All, Mathematics, Science, Languages); room cards with Join.  
- **Check:** [ ] Breadcrumbs and Create Room button present. [ ] Search and topic filters present. [ ] Room cards with Join visible. [ ] Copy in English.

**create-room.jsx** — `/study-rooms/create` → CreateRoom.tsx  
- **Key elements:** Reuses Create New Room flow (CreateNewRoomStudy).  
- **Check:** [ ] Route loads; redirects or renders create-new flow. [ ] No broken layout.

**create-new-room-study.jsx** — `/study-rooms/create-new` → CreateNewRoomStudy.tsx  
- **Key elements:** Breadcrumbs; Set Up Your Study Space; Room Name, Topic Selection, Duration (Optional), Main Study Goals; Access & Capacity; Create Room / Cancel.  
- **Check:** [ ] Breadcrumbs and "Set Up Your Study Space" heading present. [ ] Room Name, Topic Selection, Main Study Goals, Access & Capacity sections present. [ ] Create Room and Cancel buttons present. [ ] Copy in English.

**recommend-room-matching.jsx** — `/study-rooms/recommend` → RecommendRoomMatching.tsx  
- **Key elements:** Find the best study room for you; Goals + Subject inputs; Match with AI; Recommended for you grid; LIVE badge; Join.  
- **Check:** [ ] Heading and Goals/Subject inputs present. [ ] Match with AI action and recommended rooms grid visible. [ ] LIVE/Active and Join on cards. [ ] Copy in English.

**study-room.jsx** — `/study-room` → StudyRoom.tsx  
- **Key elements:** Breadcrumbs; room title; members; Join session, Leave.  
- **Check:** [ ] Breadcrumbs and room title visible. [ ] Members list or area present. [ ] Join session and Leave buttons present. [ ] Copy in English.

**study-room-dashboard.jsx** — `/study-room-dashboard` → StudyRoomDashboard.tsx  
- **Key elements:** Breadcrumbs; Active rooms, Recent activity.  
- **Check:** [ ] Breadcrumbs present. [ ] Active rooms and Recent activity sections visible. [ ] Copy in English.

**focus-room.jsx** — `/focus-room` → FocusRoom.tsx  
- **Key elements:** Breadcrumbs; streak card; Today's tasks list; Add task.  
- **Check:** [ ] Breadcrumbs present. [ ] Streak and Today's tasks visible. [ ] Add task control present. [ ] Copy in English.

**focus-room-dialog.jsx** — `/focus-room-dialog` → FocusRoomDialog.tsx  
- **Key elements:** Start focus session?; duration; Start, Cancel.  
- **Check:** [ ] Dialog/modal with session prompt and duration. [ ] Start and Cancel buttons present. [ ] Copy in English.

### Meetings, teams & sprints

**main-meeting-board.jsx** — `/meetings` → MainMeetingBoard.tsx  
- **Key elements:** Breadcrumbs; Recording Live badge; video tiles grid.  
- **Check:** [ ] Breadcrumbs and meeting UI visible. [ ] Video/participant area present. [ ] Copy in English.

**all-teams.jsx** — `/teams` → AllTeams.tsx  
- **Key elements:** Breadcrumbs; All teams; Create team; team cards with Manage.  
- **Check:** [ ] Breadcrumbs and "All teams" / Create team present. [ ] Team cards with Manage visible. [ ] Copy in English.

**team-management.jsx** — `/team-management` → TeamManagement.tsx  
- **Key elements:** Breadcrumbs; Team management; Members list; Invite member.  
- **Check:** [ ] Breadcrumbs and Team management heading present. [ ] Members list and Invite member visible. [ ] Copy in English.

**scrum-board.jsx** — `/scrum-board` → ScrumBoard.tsx  
- **Key elements:** Breadcrumbs; Board / Timeline / Files tabs; To-Do, In Progress, Done columns.  
- **Check:** [ ] Breadcrumbs and tabs present. [ ] Column headers (To-Do, In Progress, Done) visible. [ ] Copy in English.

**sprint-board.jsx** — `/sprint-board` → SprintBoard.tsx  
- **Key elements:** Breadcrumbs; Sprint board; To Do, In Progress, Done columns.  
- **Check:** [ ] Breadcrumbs and Sprint board heading present. [ ] To Do / In Progress / Done columns visible. [ ] Copy in English.

**sprint-member-board.jsx** — `/sprint-member-board` → SprintMemberBoard.tsx  
- **Key elements:** Breadcrumbs; Sprint members; member cards with avatar.  
- **Check:** [ ] Breadcrumbs and Sprint members visible. [ ] Member cards with avatars present. [ ] Copy in English.

### AI & Quizlet

**meet-ai.jsx** — `/meet-ai` → MeetAi.tsx  
- **Key elements:** Breadcrumbs; Meet AI Tutor; question input; Send; Open full chat; Recent conversations; Go to AI Support.  
- **Check:** [ ] Breadcrumbs and Meet AI Tutor context present. [ ] Question input and Send visible. [ ] Open full chat / Go to AI Support links present. [ ] Copy in English.

**ai-support.jsx** — `/ai-support` → AiSupport.tsx  
- **Key elements:** Breadcrumbs; AI support; Open chat, Back to Meet AI.  
- **Check:** [ ] Breadcrumbs and AI support heading present. [ ] Open chat and Back to Meet AI present. [ ] Copy in English.

**ai-support-attachment.jsx** — `/ai-support-attachment` → AiSupportAttachment.tsx  
- **Key elements:** Breadcrumbs; sidebar: + New chat, Today/Yesterday chat list, Tokens used; main: AI greeting, input + Send.  
- **Check:** [ ] Breadcrumbs and sidebar with New chat / Today/Yesterday present. [ ] Tokens used and main chat area with input + Send visible. [ ] Copy in English.

**quizlet.jsx** — `/quizlet` → Quizlet.tsx  
- **Key elements:** Breadcrumbs; Question progress (e.g. 7/10); Progress; topic; statement; True/False; Exit quiz.  
- **Check:** [ ] Breadcrumbs and question progress visible. [ ] Statement and True/False (or equivalent) controls present. [ ] Exit quiz present. [ ] Copy in English.

**quizlet-result.jsx** — `/quizlet-result` → QuizletResult.tsx  
- **Key elements:** Breadcrumbs; Quiz result; score; correct count; Progress; Retry, Back to dashboard.  
- **Check:** [ ] Breadcrumbs and Quiz result / score visible. [ ] Retry and Back to dashboard present. [ ] Copy in English.

### Profile, settings & account

**profile-with-sidebar.jsx** — `/profile` → ProfileWithSidebar.tsx  
- **Key elements:** Page sidebar (Home, Study Rooms, Teams, Calendar, Subscription, Personalize); Profile heading; Account, Preferences, Personalize cards.  
- **Check:** [ ] Profile sidebar and heading present. [ ] Account, Preferences, Personalize cards/sections visible. [ ] Copy in English.

**personalize.jsx** — `/personalize` → Personalize.tsx  
- **Key elements:** Breadcrumbs; Personalize your experience; Step 1; Next.  
- **Check:** [ ] Breadcrumbs and Step 1 present. [ ] Next to personalize-2 visible. [ ] Copy in English.

**personalize_2.jsx** — `/personalize-2` → Personalize2.tsx  
- **Key elements:** Breadcrumbs; Step 2 Schedule; Next, Back.  
- **Check:** [ ] Breadcrumbs and Step 2 Schedule present. [ ] Next and Back buttons visible. [ ] Copy in English.

**personalize_3.jsx** — `/personalize-3` → Personalize3.tsx  
- **Key elements:** Breadcrumbs; You're all set; Go to dashboard, Back.  
- **Check:** [ ] Breadcrumbs and "You're all set" present. [ ] Go to dashboard and Back visible. [ ] Copy in English.

**calendar.jsx** — `/calendar` → Calendar.tsx  
- **Key elements:** Breadcrumbs; Calendar; placeholder for calendar view.  
- **Check:** [ ] Breadcrumbs and Calendar heading present. [ ] Calendar area (or placeholder) visible. [ ] Copy in English.

**notification.jsx** — `/notifications` → Notification.tsx  
- **Key elements:** Breadcrumbs; Notifications; list of notification items.  
- **Check:** [ ] Breadcrumbs and Notifications heading present. [ ] Notification list visible. [ ] Copy in English.

**transaction.jsx** — `/transaction` → Transaction.tsx  
- **Key elements:** Breadcrumbs; Transactions; table (Date, Type, Amount).  
- **Check:** [ ] Breadcrumbs and Transactions heading present. [ ] Table or list with date/type/amount visible. [ ] Copy in English.

**subcription.jsx** — `/subscription` → Subscription.tsx  
- **Key elements:** Breadcrumbs; Subscription; Free / Premium plan cards; Upgrade.  
- **Check:** [ ] Breadcrumbs and Subscription heading present. [ ] Plan cards and Upgrade CTA visible. [ ] Copy in English.

---

## 3. UI-design asset index

### Screen assets (exact filenames in .UI-design)

| PNG filename | Implemented by (guide / route) |
|-------------|--------------------------------|
| 1. Welcome, Login Interface.png | welcome.jsx / /welcome |
| 2. Sign up Interface.png | sign-up.jsx / /sign-up |
| 3. Confirm mail Interface.png | confirm-mail.jsx / /confirm-mail |
| 4. Reset password Interface.png | reset-password.jsx / /reset-password |
| 5. Personalize.png | personalize.jsx / /personalize |
| 5.1 Personalize.png | personalize_2.jsx / /personalize-2 |
| 5.2 Personalize.png | personalize_2.jsx, personalize_3.jsx / /personalize-2, /personalize-3 |
| 6. Dashboard (home).png | dashboard.jsx / /dashboard |
| 7. Profile with sidebar.png | profile-with-sidebar.jsx / /profile |
| 8. Notification.png | notification.jsx / /notifications |
| 9. AI Support.png | ai-support.jsx / /ai-support |
| 9.1 AI Support.png | ai-support-attachment.jsx / /ai-support-attachment |
| 9.2 Focus room.png | focus-room.jsx / /focus-room |
| 9.2 Focus room-1.png | focus-room-dialog.jsx / /focus-room-dialog |
| 10. Quizlet.png | quizlet.jsx / /quizlet |
| 10.1 Quizlet result.png | quizlet-result.jsx / /quizlet-result |
| 11. Calendar.png | calendar.jsx / /calendar |
| 12 Study room dashboard.png | study-room-dashboard.jsx / /study-room-dashboard |
| 13 Recommend matching.png | recommend-room-matching.jsx / /study-rooms/recommend |
| 14 Study room.png | study-room.jsx / /study-room |
| 15 create new room study.png | create-new-room-study.jsx, create-room.jsx / /study-rooms/create-new, /study-rooms/create |
| 16 All Teams.png | all-teams.jsx / /teams |
| 17 Scum board.png | scrum-board.jsx / /scrum-board |
| 17 Sprint Board.png | sprint-board.jsx / /sprint-board |
| 17.1 Member.png | sprint-member-board.jsx / /sprint-member-board |
| 18  Main.png (two spaces) | main-meeting-board.jsx / /meetings |
| 20 Transaction.png | transaction.jsx / /transaction |
| 21 Subscription.png | subcription.jsx / /subscription |

### Component / other assets

Exact filenames in [.UI-design](.UI-design/). Each asset accounted for with usage.

| PNG filename | Usage |
|--------------|--------|
| _))).png | Misc asset; reference as needed |
| app anh code co the khac design nha.png | Reference / alternate app view |
| Background+Border.png | Card/container border and background |
| Background+Border-1.png | Card/container variant 1 |
| Background+Border-2.png | Card/container variant 2 |
| Background+Border-3.png | Card/container variant 3 |
| Body.png | Page body layout reference |
| Border.png | Border styling reference |
| Button.png | Button styling across app |
| Container.png | Container layout reference |
| image 5.png | Image placeholder / asset |
| image 6.png | Image placeholder / asset |
| Meeting.png | Meeting layout reference (main-meeting-board, meet-ai) |
| Meeting có AI.png | AI meeting layout (main-meeting-board, meet-ai) |
| Recommend.png | Recommend flow / layout reference |
| Scum board.png | Scrum board layout (with 17 Scum board.png) |
| Social.png | Study room discovery layout (study-room-discovery) |
| Social-1.png | Alternate social layout |
| Spring Board.png | Sprint board reference |
| Subscription.png | Subscription plan UI (with 21 Subscription.png) |
| Team.png | Team management layout (team-management) |
| Teams.png | Teams layout (team-management) |
| Teams-1.png | Teams layout variant |
| Textarea.png | Textarea styling reference |
| thêm "quay lại".png | Back link ("Quay lại") reference |
| thêm "quay lại"-1.png | Back link variant |
| Transaction.png | Transaction list layout (with 20 Transaction.png) |

---

## 4. Routes and layout summary

- **Root:** `/` redirects to `/dashboard`.
- **Standalone (no GuideLayout):** `/login`, `/callback`, `/welcome`, `/sign-up`, `/confirm-mail`, `/reset-password`.
- **With GuideLayout (sidebar + content header):** `/dashboard`, `/study-rooms`, `/study-rooms/create`, `/study-rooms/create-new`, `/study-rooms/recommend`, `/study-room`, `/study-room-dashboard`, `/focus-room`, `/focus-room-dialog`, `/meetings`, `/sprint-board`, `/sprint-member-board`, `/teams`, `/team-management`, `/scrum-board`, `/meet-ai`, `/ai-support`, `/ai-support-attachment`, `/quizlet`, `/quizlet-result`, `/profile`, `/personalize`, `/personalize-2`, `/personalize-3`, `/calendar`, `/notifications`, `/transaction`, `/subscription`.

Routes are defined in [FE/src/App.tsx](FE/src/App.tsx) (lines 75–110).

```mermaid
flowchart LR
  subgraph Standalone
    "/" --> "/dashboard"
    "/login"
    "/callback"
    "/welcome"
    "/sign-up"
    "/confirm-mail"
    "/reset-password"
  end
  subgraph GuideLayout
    "/dashboard"
    "/study-rooms"
    "/study-rooms/create"
    "/study-rooms/create-new"
    "/study-rooms/recommend"
    "/study-room"
    "/study-room-dashboard"
    "/focus-room"
    "/focus-room-dialog"
    "/meetings"
    "/teams"
    "/team-management"
    "/scrum-board"
    "/sprint-board"
    "/sprint-member-board"
    "/meet-ai"
    "/ai-support"
    "/ai-support-attachment"
    "/quizlet"
    "/quizlet-result"
    "/profile"
    "/personalize"
    "/personalize-2"
    "/personalize-3"
    "/calendar"
    "/notifications"
    "/transaction"
    "/subscription"
  end
```

---

## 5. How to verify (repeatable process)

1. **Route and page existence**  
   For each row in the master table (and the 30-page table), confirm the route exists in [FE/src/App.tsx](FE/src/App.tsx) and the FE page file exists under `FE/src/pages/` or `FE/src/pages/guide/`. Document once; no script required.

2. **Per-page manual check**  
   For each guide: (a) Open the corresponding route in the app. (b) Walk the **Verification** bullets in section 2 and mark pass/fail (or N/A). (c) Optionally open the primary UI-design PNG and compare layout/sections (same sections and CTAs; no pixel-perfect).

3. **Optional — light automation (string extraction)**  
   From each `.front_end_guide/*.jsx`, grep or parse visible text (e.g. text inside `data-layer` divs or between tags) to get expected labels/headings/buttons. For the corresponding FE page, search for those strings (or English equivalents) and flag missing copy. Can be a small script that outputs "missing: [list]" per file, or a manual grep step documented here.

4. **Status column**  
   In the 30-page table and master table: `[x]` implemented and verified, `[~]` implemented but not yet verified, `[ ]` not implemented. Update when you run the verification process.

---

## 6. Copy language

| Area | Requirement | Status |
|------|-------------|--------|
| GuideLayout | Sidebar and header labels in English | [x] |
| Auth pages | Welcome, Sign up, Confirm mail, Reset password in English | [x] |
| Dashboard | Open study rooms and CTAs in English | [x] |
| Study rooms | All labels and buttons in English | [x] |
| Recommend matching | Heading, description, Goals/Subject, Match with AI, Recommended for you, LIVE, Join in English | [x] |
| AI Support | Tokens used, Today, Yesterday, New chat in English | [x] |
| Profile & account | Profile, Personalize, and related copy in English | [x] |

---

## 7. Optional follow-ups

- [ ] Replace placeholder "Nam" in sidebar ranking with current user name or "You".
- [ ] Add calendar library and real calendar UI to Calendar page (currently placeholder).
- [ ] Align Study Room Discovery filters/tabs with Social.png (e.g. My Rooms, Browse Topics, Recommended, # Search by ID) if product spec matches.
- [ ] Add "Back" / "Quay lại" link where indicated in .UI-design (thêm "quay lại".png) if required.
