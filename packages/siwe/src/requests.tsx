export interface NonceResponse {
  nonce: string
  ok: boolean
}

export const getNonce = async (backendUrl: string) => {
  const nonceRequest = await fetch(`${backendUrl}/auth/siwe/nonce`, {
    method: 'GET',
    credentials: 'include',
  })
  const nonceResponse = await nonceRequest.json()

  return {
    ...nonceResponse,
    ...nonceRequest,
  } as NonceResponse
}

export interface AuthResponse {
  address: string
  ok: boolean
}

export const getAuth = async (backendUrl: string) => {
  const authRequest = await fetch(`${backendUrl}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  })
  const authResponse = await authRequest.json()

  return {
    ...authResponse,
    ...authRequest,
  }
}

export const postLogin = async (backendUrl: string, signature: string, message: string) => {
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
}

export interface LogoutResponse {
  ok: boolean
}

export const postLogout = async (backendUrl: string) => {
  const logoutRequest = await fetch(`${backendUrl}/logout/me`, {
    method: 'POST',
    credentials: 'include',
  })

  return logoutRequest as LogoutResponse
}
