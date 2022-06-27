import { useEthers } from '@usedapp/core'
import React, { useEffect, ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { SiweMessage } from 'siwe'
import { SiweFetchers, getFetchers } from './requests'

export interface SiweContextValue {
  signIn: (signInOptions?: SignInOptions) => void
  signOut: () => void
  isLoggedIn: boolean
  authToken: string | undefined | null
}

const SiweContext = createContext<SiweContextValue>({
  signIn: () => undefined,
  signOut: () => undefined,
  isLoggedIn: false,
  authToken: undefined,
})

export function useSiwe() {
  return useContext(SiweContext)
}

export interface SignInOptions {
  domain?: string
  uri?: string
}

export interface SiweProviderProps {
  backendUrl?: string
  children?: ReactNode
  api?: SiweFetchers
}

export const SiweProvider = ({ children, backendUrl, api }: SiweProviderProps) => {
  const { account, chainId, library } = useEthers()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const { getNonce, getAuth } = api ?? getFetchers(backendUrl ?? '')
  const [authToken, setAuthToken] = useState<string | undefined | null>(undefined)

  useEffect(() => {
    if (!account || !chainId) {
      return
    }
    setAuthToken(localStorage.getItem('authToken' + account + chainId))
    if (authToken === null) {
      return
    }
    void getAuth(account, chainId).then((res) => (res.loggedIn ? setLoggedIn(true) : setLoggedIn(false)))
  }, [authToken, getAuth, account, chainId])

  const signIn = useCallback(
    async (signInOptions?: SignInOptions) => {
      if (!account || !chainId || !library) {
        return
      }
      const signer = library.getSigner()
      const { nonce } = await getNonce()

      if (!nonce) {
        return
      }

      const message = new SiweMessage({
        domain: signInOptions?.domain ?? window.location.host,
        address: await signer.getAddress(),
        statement: 'Sign in with Ethereum.',
        uri: signInOptions?.uri ?? window.location.origin,
        version: '1',
        chainId,
        nonce,
      })
      const signature = await signer.signMessage(message.prepareMessage())

      const session = JSON.stringify({ signature, message })

      localStorage.setItem('authToken' + account + chainId, session)
      setAuthToken(session)

      void getAuth(account, chainId).then((res) => (res.loggedIn ? setLoggedIn(true) : undefined))
    },
    [account, chainId, library, getAuth, setAuthToken, getNonce]
  )

  const signOut = useCallback(async () => {
    if (!account || !chainId) {
      return
    }
    localStorage.removeItem('authToken' + account + chainId)
    setLoggedIn(false)
    setAuthToken(undefined)
  }, [setLoggedIn, setAuthToken, account, chainId])

  const value = {
    signIn,
    signOut,
    isLoggedIn,
    authToken,
  }

  return <SiweContext.Provider value={value} children={children} />
}
