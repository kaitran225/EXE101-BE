# Implementation checklist – 30 pages

Quick pass/fail verification against [.front_end_guide](../.front_end_guide/) and [.UI-design](../.UI-design/). Copy in **English**. For the full checklist (master mapping, per-screen verification blocks, UI-design asset index, routes diagram), see [FRONTEND_GUIDE_CHECKLIST.md](FRONTEND_GUIDE_CHECKLIST.md).

---

## 30-page checklist

| # | Guide file | UI design | Route | FE page | Status |
|---|------------|-----------|--------|---------|--------|
| 1 | welcome.jsx | 1. Welcome, Login Interface.png | /welcome | Welcome.tsx | [ ] |
| 2 | sign-up.jsx | 2. Sign up Interface.png | /sign-up | SignUp.tsx | [ ] |
| 3 | confirm-mail.jsx | 3. Confirm mail Interface.png | /confirm-mail | ConfirmMail.tsx | [ ] |
| 4 | reset-password.jsx | 4. Reset password Interface.png | /reset-password | ResetPassword.tsx | [ ] |
| 5 | dashboard.jsx | 6. Dashboard (home).png | /dashboard | Dashboard.tsx | [ ] |
| 6 | study-room-discovery.jsx | Social.png | /study-rooms | StudyRoomDiscovery.tsx | [ ] |
| 7 | create-new-room-study.jsx | 15 create new room study.png | /study-rooms/create-new | CreateNewRoomStudy.tsx | [ ] |
| 8 | recommend-room-matching.jsx | 13 Recommend matching.png | /study-rooms/recommend | RecommendRoomMatching.tsx | [ ] |
| 9 | study-room.jsx | 14 Study room.png | /study-room | StudyRoom.tsx | [ ] |
| 10 | study-room-dashboard.jsx | 12 Study room dashboard.png | /study-room-dashboard | StudyRoomDashboard.tsx | [ ] |
| 11 | focus-room.jsx | 9.2 Focus room.png | /focus-room | FocusRoom.tsx | [ ] |
| 12 | main-meeting-board.jsx | 18  Main.png, Meeting.png, Meeting có AI.png | /meetings | MainMeetingBoard.tsx | [ ] |
| 13 | all-teams.jsx | 16 All Teams.png | /teams | AllTeams.tsx | [ ] |
| 14 | team-management.jsx | Team.png, Teams.png | /team-management | TeamManagement.tsx | [ ] |
| 15 | scrum-board.jsx | 17 Scum board.png, Scum board.png | /scrum-board | ScrumBoard.tsx | [ ] |
| 16 | sprint-board.jsx | 17 Sprint Board.png | /sprint-board | SprintBoard.tsx | [ ] |
| 17 | sprint-member-board.jsx | 17.1 Member.png | /sprint-member-board | SprintMemberBoard.tsx | [ ] |
| 18 | meet-ai.jsx | Meeting có AI.png | /meet-ai | MeetAi.tsx | [ ] |
| 19 | ai-support.jsx | 9. AI Support.png | /ai-support | AiSupport.tsx | [ ] |
| 20 | ai-support-attachment.jsx | 9.1 AI Support.png | /ai-support-attachment | AiSupportAttachment.tsx | [ ] |
| 21 | quizlet.jsx | 10. Quizlet.png | /quizlet | Quizlet.tsx | [ ] |
| 22 | quizlet-result.jsx | 10.1 Quizlet result.png | /quizlet-result | QuizletResult.tsx | [ ] |
| 23 | profile-with-sidebar.jsx | 7. Profile with sidebar.png | /profile | ProfileWithSidebar.tsx | [ ] |
| 24 | personalize.jsx | 5. Personalize.png | /personalize | Personalize.tsx | [ ] |
| 25 | personalize_2.jsx | 5.1 Personalize.png, 5.2 Personalize.png | /personalize-2 | Personalize2.tsx | [ ] |
| 26 | personalize_3.jsx | 5.2 Personalize.png | /personalize-3 | Personalize3.tsx | [ ] |
| 27 | calendar.jsx | 11. Calendar.png | /calendar | Calendar.tsx | [ ] |
| 28 | notification.jsx | 8. Notification.png | /notifications | Notification.tsx | [ ] |
| 29 | transaction.jsx | 20 Transaction.png, Transaction.png | /transaction | Transaction.tsx | [ ] |
| 30 | subcription.jsx | 21 Subscription.png, Subscription.png | /subscription | Subscription.tsx | [ ] |

---

## Verification (per page)

For each row, open the **Route** in the app and confirm:

1. Route exists in `FE/src/App.tsx` and the **FE page** file exists.
2. Page renders without error and shows expected layout (breadcrumbs where applicable).
3. Key elements from the guide/UI design are present (headings, main buttons, forms or cards).
4. Copy is in English.

---

## Not in the 30 (still implemented)

| Guide file | UI design | Route | FE page | Note |
|------------|-----------|--------|---------|------|
| create-room.jsx | (same as #7) | /study-rooms/create | CreateRoom.tsx | Reuses CreateNewRoomStudy flow |
| focus-room-dialog.jsx | 9.2 Focus room-1.png | /focus-room-dialog | FocusRoomDialog.tsx | Dialog overlay, not full page |

---

## Routes summary

- **Standalone:** `/login`, `/callback`, `/welcome`, `/sign-up`, `/confirm-mail`, `/reset-password`. `/` redirects to `/dashboard`.
- **GuideLayout:** All routes in the table from #5 onward (dashboard through subscription), plus `/study-rooms/create` and `/focus-room-dialog`.
