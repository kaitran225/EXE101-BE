const AUTH_ISSUER = 'http://localhost:8081'

export type ApiResponse<T> = { success: boolean; data?: T; message?: string; errorCode?: string }

export const authApi = {
  loginUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: 'exe101-web',
      redirect_uri: `${window.location.origin}/callback`,
      scope: 'openid read write',
    })
    return `${AUTH_ISSUER}/oauth2/authorize?${params}`
  },

  async me(token: string): Promise<ApiResponse<{ userSso: string; email: string; fullName?: string }>> {
    const r = await fetch('/api/v1/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return r.json()
  },
}

export const readApi = {
  async health(): Promise<ApiResponse<{ service: string; status: string }>> {
    const r = await fetch('http://localhost:8083/api/v1/read/health')
    return r.json()
  },
}

export const workflowApi = {
  async health(): Promise<ApiResponse<{ service: string; status: string }>> {
    const r = await fetch('http://localhost:8082/api/v1/workflow/health')
    return r.json()
  },
}

export function getStoredToken(): string | null {
  return localStorage.getItem('access_token')
}

export function setStoredToken(token: string): void {
  localStorage.setItem('access_token', token)
}

export function clearStoredToken(): void {
  localStorage.removeItem('access_token')
}
