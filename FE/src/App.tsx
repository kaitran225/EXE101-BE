import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Button } from './components/ui'
import { AuthLayout } from './components/layout/AuthLayout'
import { GuideLayout } from './components/layout/GuideLayout'
import Login from './pages/Login'
import Callback from './pages/Callback'
import Dashboard from './pages/Dashboard'
import DebugComponents from './pages/DebugComponents'
import {
  Welcome,
  SignUp,
  ConfirmMail,
  ResetPassword,
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
} from './pages/guide'

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
            <Link to="/dashboard" className="text-lg font-bold text-neutral-900 hover:text-neutral-700 transition-colors duration-150">
              Together
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
        <Route path="/dashboard" element={<GuideLayout><Dashboard /></GuideLayout>} />
        <Route path="/study-rooms" element={<GuideLayout><StudyRoomDiscovery /></GuideLayout>} />
        <Route path="/study-rooms/create" element={<GuideLayout><CreateRoom /></GuideLayout>} />
        <Route path="/study-rooms/create-new" element={<GuideLayout><CreateNewRoomStudy /></GuideLayout>} />
        <Route path="/study-rooms/recommend" element={<GuideLayout><RecommendRoomMatching /></GuideLayout>} />
        <Route path="/study-room" element={<StudyRoom />} />
        <Route path="/study-room-dashboard" element={<GuideLayout><StudyRoomDashboard /></GuideLayout>} />
        <Route path="/focus-room" element={<FocusRoom />} />
        <Route path="/focus-room-dialog" element={<GuideLayout><FocusRoomDialog /></GuideLayout>} />
        <Route path="/meetings" element={<GuideLayout><MeetingLobby /></GuideLayout>} />
        <Route path="/meetings/room" element={<GuideLayout><MainMeetingBoard /></GuideLayout>} />
        <Route path="/teams/board" element={<GuideLayout><BoardPage /></GuideLayout>} />
        <Route path="/sprint-board" element={<Navigate to="/teams/board?tab=sprint" replace />} />
        <Route path="/sprint-member-board" element={<GuideLayout><SprintMemberBoard /></GuideLayout>} />
        <Route path="/teams" element={<GuideLayout><AllTeams /></GuideLayout>} />
        <Route path="/team-management" element={<GuideLayout><TeamManagement /></GuideLayout>} />
        <Route path="/scrum-board" element={<Navigate to="/teams/board?tab=scrum" replace />} />
        <Route path="/meet-ai" element={<GuideLayout><MeetAi /></GuideLayout>} />
        <Route path="/ai-support" element={<GuideLayout><AiSupport /></GuideLayout>} />
        <Route path="/quizlet" element={<GuideLayout><Quizlet /></GuideLayout>} />
        <Route path="/quizlet-result" element={<GuideLayout><QuizletResult /></GuideLayout>} />
        <Route path="/profile" element={<GuideLayout><ProfileWithSidebar /></GuideLayout>} />
        <Route path="/personalize" element={<GuideLayout><Personalize /></GuideLayout>} />
        <Route path="/personalize-2" element={<GuideLayout><Personalize2 /></GuideLayout>} />
        <Route path="/personalize-3" element={<GuideLayout><Personalize3 /></GuideLayout>} />
        <Route path="/calendar" element={<GuideLayout><Calendar /></GuideLayout>} />
        <Route path="/notifications" element={<GuideLayout><Notification /></GuideLayout>} />
        <Route path="/transaction" element={<GuideLayout><Transaction /></GuideLayout>} />
        <Route path="/subscription" element={<GuideLayout><Subscription /></GuideLayout>} />
        <Route path="/shop" element={<GuideLayout><Shop /></GuideLayout>} />
      </Routes>
    </div>
  )
}
