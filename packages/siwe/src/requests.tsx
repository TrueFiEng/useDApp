export interface NonceResponse {
  nonce: string
  ok: boolean
}

export interface AuthResponse {
  address: string
  ok: boolean
}

export interface LogoutResponse {
  ok: boolean
}

export interface SiweFetchers {
  getNonce: () => Promise<NonceResponse>
  getAuth: () => Promise<AuthResponse>
  login: (signature: string, message: string) => Promise<AuthResponse>
  logout: () => Promise<LogoutResponse>
}

export const getFetchers = (backendUrl: string): SiweFetchers => {
  return {
    getAuth: async () => {
      const authRequest = await fetch(`${backendUrl}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      })
      const authResponse = await authRequest.json()
    
      return {
        ...authResponse,
        ...authRequest,
      }
    },
    getNonce: async () => {
      const nonceRequest = await fetch(`${backendUrl}/auth/siwe/nonce`, {
        method: 'GET',
        credentials: 'include',
      })
      const nonceResponse = await nonceRequest.json()
    
      return {
        ...nonceResponse,
        ...nonceRequest,
      } as NonceResponse
    },
    login: async (signature: string, message: string) => {
      const loginRequest = await fetch(`${backendUrl}/auth/siwe/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature,
          message,
        }),
      })
      const loginResponse = await loginRequest.json()
    
      return {
        ...loginResponse,
        ...loginRequest,
      } as AuthResponse
    },
    logout: async () => {
      const logoutRequest = await fetch(`${backendUrl}/logout/me`, {
        method: 'POST',
        credentials: 'include',
      })
    
      return logoutRequest as LogoutResponse
    },
  }
}
