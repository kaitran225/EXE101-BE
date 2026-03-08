import { useEffect } from 'react'
import { authApi } from '../api/client'

export default function Login() {
  useEffect(() => {
    window.location.href = authApi.loginUrl()
  }, [])
  return <p>Redirecting to login…</p>
}
