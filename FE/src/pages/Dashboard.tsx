import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { MeResponse } from '../types/dto'
import { authApi, readApi, workflowApi, getStoredToken, clearStoredToken } from '../api/client'

export default function Dashboard() {
  const [user, setUser] = useState<MeResponse | null>(null)
  const [readHealth, setReadHealth] = useState<string>('—')
  const [workflowHealth, setWorkflowHealth] = useState<string>('—')

  useEffect(() => {
    const token = getStoredToken()
    if (!token) return
    authApi.me(token).then((res) => {
      if (res.success && res.data) setUser(res.data)
    })
    readApi.health().then((res) => setReadHealth(res.success ? 'UP' : 'DOWN'))
    workflowApi.health().then((res) => setWorkflowHealth(res.success ? 'UP' : 'DOWN'))
  }, [])

  const logout = () => {
    clearStoredToken()
    setUser(null)
    window.location.href = '/'
  }

  if (!getStoredToken()) {
    return (
      <div>
        <p>Not logged in.</p>
        <Link to="/login">Login</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <p>
          Logged in as <strong>{user.email}</strong> ({user.userSso})
          {user.fullName != null && ` — ${user.fullName}`}
        </p>
      )}
      <p>Read service: {readHealth} | Workflow service: {workflowHealth}</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  )
}
