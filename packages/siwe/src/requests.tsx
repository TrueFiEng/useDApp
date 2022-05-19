import { SiweMessage } from 'siwe'

export interface NonceResponse {
  nonce: string
  ok: boolean
}

export interface AuthResponse {
  message: SiweMessage
  loggedIn: boolean
}

export interface SiweFetchers {
  getNonce: () => Promise<NonceResponse>
  getAuth: () => Promise<AuthResponse>
}

export const getFetchers = (backendUrl: string): SiweFetchers => {
  return {
    getAuth: async () => {
      const token = localStorage.getItem('authToken')

      const authRequest = await fetch(`${backendUrl}/siwe/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const authResponse = await authRequest.json()

      return {
        ...authRequest,
        ...authResponse,
      } as AuthResponse
    },
    getNonce: async () => {
      const nonceRequest = await fetch(`${backendUrl}/siwe/init`, { method: 'POST' })
      const nonceResponse = await nonceRequest.json()

      return {
        ...nonceResponse,
      } as NonceResponse
    },
  }
}
