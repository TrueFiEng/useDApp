import { useEthers } from '@usedapp/core'
import React, { useEffect, ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { SiweMessage } from 'siwe'
import { SiweFetchers, getFetchers } from './requests'

export interface SiweContextValue {
  signIn: (signInOptions?: SignInOptions) => void
  signOut: () => void
  isLoggedIn: boolean
}

const SiweContext = createContext<SiweContextValue>({
  signIn: () => undefined,
  signOut: () => undefined,
  isLoggedIn: false,
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
  const { getNonce, getAuth, signIn, signOut } = api ?? getFetchers(backendUrl ?? '')

  useEffect(() => {
    if (!account || !chainId) {
      return
    }
    void getAuth().then((res) => (res.loggedIn ? setLoggedIn(true) : setLoggedIn(false)))
  }, [getAuth, account, chainId])

  const handleSignIn = useCallback(
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

      await signIn({ signature, message })

      void getAuth().then((res) => (res.loggedIn ? setLoggedIn(true) : undefined))
    },
    [account, chainId, library, getAuth, getNonce, signIn]
  )

  const handleSignOut = useCallback(async () => {
    if (!account || !chainId) {
      return
    }

    await signOut()
    setLoggedIn(false)
  }, [setLoggedIn, account, chainId, signOut])

  const value = {
    signIn: handleSignIn,
    signOut: handleSignOut,
    isLoggedIn,
  }

  return <SiweContext.Provider value={value} children={children} />
}
