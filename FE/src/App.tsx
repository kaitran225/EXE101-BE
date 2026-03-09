import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Button } from './components/common'
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
const AUTH_PATHS = ['/welcome', '/sign-up', '/confirm-mail', '/reset-password']

export default function App() {
  const location = useLocation()
  const isStandalone = STANDALONE_PATHS.includes(location.pathname)
  const isAuth = AUTH_PATHS.includes(location.pathname)

  return (
    <div className={isStandalone ? 'min-h-screen bg-neutral-100' : ''}>
      {isStandalone && !isAuth && (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 shadow-sm">
          <nav className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 md:gap-3 max-w-[1200px] mx-auto" aria-label="Main">
            <Link to="/dashboard" className="flex items-center hover:opacity-90 transition-opacity">
              <img src="/together/horizontal-icon.svg" alt="Together" className="h-7 w-auto" />
            </Link>
            <Link to="/welcome" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150">Welcome</Link>
            <Link to="/dashboard" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150">Dashboard</Link>
            <Link to="/study-rooms" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150">Study Rooms</Link>
            <Link to="/teams" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150">Teams</Link>
            <Link to="/meet-ai" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150">AI Tutor</Link>
            <Link to="/profile" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150">Profile</Link>
            <Link to="/debug" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150">Components</Link>
            <div className="ml-auto flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary" size="sm">Dashboard</Button>
              </Link>
            </div>
          </nav>
        </header>
      )}
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
