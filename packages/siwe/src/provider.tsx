import { useEthers } from '@usedapp/core'
import React, { useEffect, ReactNode, useState } from 'react'
import { createContext, useContext } from 'react'
import { SiweMessage } from 'siwe'

export interface SiweContextInterface {
  signIn: () => void
  signOut: () => void
  isLoggedIn: boolean
}

const SiweContext = createContext<SiweContextInterface>({
  signIn: () => undefined,
  signOut: () => undefined,
  isLoggedIn: false,
})

export function useSiwe() {
  return useContext(SiweContext)
}

export interface SiweProviderProps {
  children?: ReactNode
  backendUrl: string
}

export const SiweProvider = ({ children, backendUrl }: SiweProviderProps) => {
  const { account, chainId, library } = useEthers()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [sessionChainId, setSessionChainId] = useState<number | undefined>(undefined)

  useEffect(() => {
    if ((!!account && account !== address) || (!!chainId && chainId !== sessionChainId)) {
      setLoggedIn(false)
    }
  }, [account, chainId])

  useEffect(() => {
    if (!account) {
      return
    }
    const checkAuthStatus = async () => {
      const authRequest = await fetch(`${backendUrl}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      })
      const authResponse = await authRequest.json()

      if (authRequest.ok && authResponse.address === account) {
        setAddress(authResponse.address)
        setLoggedIn(true)
      }
    }
    checkAuthStatus()
  }, [account, chainId])

  const signIn = async () => {
    if (!account || !chainId || !library) {
      return
    }
    const nonceRequest = await fetch(`${backendUrl}/auth/siwe/nonce`, {
      method: 'GET',
      credentials: 'include',
    })
    const nonceResponse = await nonceRequest.json()

    const signer = library.getSigner()

    const message = new SiweMessage({
      domain: window.location.host,
      address: await signer.getAddress(),
      statement: 'Sign in with Ethereum.',
      uri: window.location.origin,
      version: '1',
      chainId: chainId,
      nonce: nonceResponse.nonce,
    }).toMessage()

    const signature = await signer.signMessage(message)

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

    if (loginRequest.ok) {
      setSessionChainId(chainId)
      setAddress(loginResponse.address)
      setLoggedIn(true)
    }
  }

  const signOut = async () => {
    const logoutRequest = await fetch(`${backendUrl}/logout/me`, {
      method: 'POST',
      credentials: 'include',
    })

    if (logoutRequest.ok) {
      setLoggedIn(false)
      setAddress(undefined)
      setSessionChainId(undefined)
    }
  }

  const value = {
    signIn,
    signOut,
    isLoggedIn,
  }

  return <SiweContext.Provider value={value} children={children} />
}
