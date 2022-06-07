import { SiweMessage } from 'siwe'

export interface NonceResponse {
  nonce: string | undefined
  ok: boolean
}

export interface AuthResponse {
  message: SiweMessage | undefined
  loggedIn: boolean
}

export interface SiweFetchers {
  getNonce: () => Promise<NonceResponse>
  getAuth: (account: string, chainId: number) => Promise<AuthResponse>
}

const failedAuthResponse = {
  loggedIn: false,
  message: undefined
}

const failedNonceResponse = { 
  nonce: undefined,
  ok: false,
}

export const getFetchers = (backendUrl: string): SiweFetchers => {
  return {
    getAuth: async (account: string, chainId: number) => {
      const token = localStorage.getItem('authToken' + account + chainId)

      if (token === undefined || token === null) {
        return failedAuthResponse
      }

      const authRequest = await fetch(`${backendUrl}/siwe/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!authRequest.ok) {
        return failedAuthResponse
      }

      const authResponse = await authRequest.json()

      return {
        ...authRequest,
        ...authResponse,
      } as AuthResponse
    },
    getNonce: async () => {
      const nonceRequest = await fetch(`${backendUrl}/siwe/init`, { method: 'POST' })

      if (!nonceRequest.ok) {
        return failedNonceResponse
      }

      const nonceResponse = await nonceRequest.json()

      return {
        ...nonceResponse,
      } as NonceResponse
    },
  }
}
