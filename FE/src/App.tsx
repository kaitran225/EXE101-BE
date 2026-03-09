import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AuthLayout } from './components/layout/AuthLayout'
import { DashboardLayout } from './components/layout/DashboardLayout'
import Login from './pages/Login'
import Callback from './pages/Callback'
import DebugComponents from './pages/DebugComponents'
import {
  Welcome,
  SignUp,
  ConfirmMail,
  ResetPassword,
  Dashboard,
  StudyRoomDiscovery,
  CreateNewRoomStudy,
  CreateRoom,
  RecommendRoomMatching,
  StudyRoom,
  StudyRoomDashboard,
  FocusRoom,
  FocusRoomDialog,
  MeetingLobby,
  MainMeetingBoard,
  BoardPage,
  SprintMemberBoard,
  AllTeams,
  TeamManagement,
  MeetAi,
  AiSupport,
  Quizlet,
  QuizletResult,
  ProfileWithSidebar,
  Personalize,
  Personalize2,
  Personalize3,
  Calendar,
  Notification,
  Transaction,
  Subscription,
  Shop,
} from './pages/app'

const STANDALONE_PATHS = ['/login', '/callback', '/welcome', '/sign-up', '/confirm-mail', '/reset-password', '/debug']

export default function App() {
  const location = useLocation()
  const isStandalone = STANDALONE_PATHS.includes(location.pathname)

  return (
    <div className={isStandalone ? 'min-h-screen bg-neutral-100 dark:bg-neutral-900' : ''}>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/login" element={<main className="p-3 md:p-4 md:py-6 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)]"><Login /></main>} />
        <Route path="/callback" element={<main className="p-3 md:p-4 md:py-6 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)]"><Callback /></main>} />
        <Route path="/welcome" element={<AuthLayout><Welcome /></AuthLayout>} />
        <Route path="/sign-up" element={<AuthLayout><SignUp /></AuthLayout>} />
        <Route path="/confirm-mail" element={<AuthLayout><ConfirmMail /></AuthLayout>} />
        <Route path="/reset-password" element={<AuthLayout><ResetPassword /></AuthLayout>} />
        <Route path="/debug" element={<DebugComponents />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/study-rooms" element={<DashboardLayout><StudyRoomDiscovery /></DashboardLayout>} />
        <Route path="/study-rooms/create" element={<DashboardLayout><CreateRoom /></DashboardLayout>} />
        <Route path="/study-rooms/create-new" element={<DashboardLayout><CreateNewRoomStudy /></DashboardLayout>} />
        <Route path="/study-rooms/recommend" element={<DashboardLayout><RecommendRoomMatching /></DashboardLayout>} />
        <Route path="/study-room" element={<StudyRoom />} />
        <Route path="/study-room-dashboard" element={<DashboardLayout><StudyRoomDashboard /></DashboardLayout>} />
        <Route path="/focus-room" element={<FocusRoom />} />
        <Route path="/focus-room-dialog" element={<DashboardLayout><FocusRoomDialog /></DashboardLayout>} />
        <Route path="/meetings" element={<DashboardLayout><MeetingLobby /></DashboardLayout>} />
        <Route path="/meetings/room" element={<DashboardLayout><MainMeetingBoard /></DashboardLayout>} />
        <Route path="/teams/board" element={<DashboardLayout><BoardPage /></DashboardLayout>} />
        <Route path="/sprint-board" element={<Navigate to="/teams/board?tab=sprint" replace />} />
        <Route path="/sprint-member-board" element={<DashboardLayout><SprintMemberBoard /></DashboardLayout>} />
        <Route path="/teams" element={<DashboardLayout><AllTeams /></DashboardLayout>} />
        <Route path="/team-management" element={<DashboardLayout><TeamManagement /></DashboardLayout>} />
        <Route path="/scrum-board" element={<Navigate to="/teams/board?tab=scrum" replace />} />
        <Route path="/meet-ai" element={<DashboardLayout><MeetAi /></DashboardLayout>} />
        <Route path="/ai-support" element={<DashboardLayout><AiSupport /></DashboardLayout>} />
        <Route path="/quizlet" element={<DashboardLayout><Quizlet /></DashboardLayout>} />
        <Route path="/quizlet-result" element={<DashboardLayout><QuizletResult /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><ProfileWithSidebar /></DashboardLayout>} />
        <Route path="/personalize" element={<DashboardLayout><Personalize /></DashboardLayout>} />
        <Route path="/personalize-2" element={<DashboardLayout><Personalize2 /></DashboardLayout>} />
        <Route path="/personalize-3" element={<DashboardLayout><Personalize3 /></DashboardLayout>} />
        <Route path="/calendar" element={<DashboardLayout><Calendar /></DashboardLayout>} />
        <Route path="/notifications" element={<DashboardLayout><Notification /></DashboardLayout>} />
        <Route path="/transaction" element={<DashboardLayout><Transaction /></DashboardLayout>} />
        <Route path="/subscription" element={<DashboardLayout><Subscription /></DashboardLayout>} />
        <Route path="/shop" element={<DashboardLayout><Shop /></DashboardLayout>} />
      </Routes>
    </div>
  )
}
