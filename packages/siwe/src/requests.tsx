import { SiweMessage } from 'siwe'

export interface NonceResponse {
  nonce: string | undefined
  ok: boolean
}

export interface AuthResponse {
  message: SiweMessage | undefined
  loggedIn: boolean
}

interface SignInProps {
  signature: string
  message: SiweMessage
}

export interface SiweFetchers {
  getNonce: () => Promise<NonceResponse>
  getAuth: () => Promise<AuthResponse>
  signIn: ({ signature, message }: SignInProps) => Promise<void>
  signOut: () => Promise<void>
}

const failedAuthResponse = {
  loggedIn: false,
  message: undefined,
}

const failedNonceResponse = {
  nonce: undefined,
  ok: false,
}

export const getFetchers = (backendUrl: string): SiweFetchers => {
  return {
    getAuth: async () => {
      const authRequest = await fetch(`${backendUrl}/siwe/me`, {
        credentials: 'include',
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
    signIn: async ({ signature, message }) => {
      await fetch(`${backendUrl}/siwe/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature,
          message,
        }),
      })
    },
    signOut: async () => {
      await fetch(`${backendUrl}/siwe/signout`, {
        credentials: 'include',
      })
    },
  }
}
