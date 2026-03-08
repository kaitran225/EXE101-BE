import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { MeResponse } from '../../types/dto'
import { authApi, readApi, workflowApi, getStoredToken, clearStoredToken } from '../../api/client'
import { getFakeMeResponse } from '../../mocks/user'
import { Button, Card, Progress, Badge } from '../../components/ui'

export default function ProfileWithSidebar() {
  const [user, setUser] = useState<MeResponse | null>(null)
  const [readHealth, setReadHealth] = useState<string>('—')
  const [workflowHealth, setWorkflowHealth] = useState<string>('—')

  useEffect(() => {
    const token = getStoredToken()
    if (token) {
      authApi.me(token).then((res) => {
        if (res.success && res.data) setUser(res.data)
      })
    } else {
      const fake = getFakeMeResponse()
      if (fake.success && fake.data) setUser(fake.data)
    }
    readApi.health().then((res) => setReadHealth(res.success ? 'UP' : 'DOWN'))
    workflowApi.health().then((res) => setWorkflowHealth(res.success ? 'UP' : 'DOWN'))
  }, [])

  const logout = () => {
    clearStoredToken()
    setUser(null)
    window.location.href = '/'
  }

  const readUp = readHealth === 'UP'
  const workflowUp = workflowHealth === 'UP'

  return (
    <div className="flex flex-col gap-8 w-full">
        <div className="border-b border-neutral-200 pb-6">
          <h1 className="mb-2 text-3xl font-bold text-neutral-900 md:text-4xl">
            Profile
          </h1>
          <p className="text-lg text-neutral-500">
            Your account, services, and study progress.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card heading="Account">
            {user ? (
              <div className="flex flex-col gap-4">
                <p className="text-neutral-900">
                  Logged in as <strong>{user.email}</strong>
                  {user.fullName != null && ` — ${user.fullName}`}
                </p>
                <p className="text-sm text-neutral-500">{user.userSso}</p>
                <Button variant="secondary" size="md" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <p className="text-neutral-600">
                Email, name, and avatar settings.
              </p>
            )}
          </Card>

          <Card heading="Services">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-900">Read</span>
                <Badge variant={readUp ? 'primary' : 'outline'}>{readHealth}</Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-900">Workflow</span>
                <Badge variant={workflowUp ? 'primary' : 'outline'}>
                  {workflowHealth}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        <Card heading="Study progress">
          <div className="flex flex-col gap-4">
            <Progress
              value={2}
              max={3}
              label={
                <>
                  <span>Level 2</span>
                  <span>2,450 / 3,000 XP</span>
                </>
              }
            />
            <p className="text-sm text-neutral-500">
              Use this area later for streak and XP from the backend.
            </p>
          </div>
        </Card>

        <Card heading="Open study rooms">
          <p className="mb-4 text-neutral-600">
            Join or create a study room to learn with peers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/study-rooms">
              <Button variant="secondary" size="md">
                View study rooms
              </Button>
            </Link>
            <Link to="/study-rooms/create-new">
              <Button variant="primary" size="md">
                Create room
              </Button>
            </Link>
            <Link to="/study-rooms/recommend">
              <Button variant="ghost" size="md">
                Get room recommendations
              </Button>
            </Link>
          </div>
        </Card>
    </div>
  )
}
