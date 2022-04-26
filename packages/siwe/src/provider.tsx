import { useEthers } from '@usedapp/core'
import React, { useEffect, ReactNode, useState } from 'react'
import { createContext, useContext } from 'react'
import { SiweMessage } from 'siwe'
import { SiweFetchers, getFetchers } from './requests'

export interface SiweContextValue {
  signIn: (signInOptions?: SignInOptions) => void
  signOut: () => void
  isLoggedIn: boolean
  token: string | undefined
}

const SiweContext = createContext<SiweContextValue>({
  signIn: () => undefined,
  signOut: () => undefined,
  isLoggedIn: false,
  token: undefined,
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
  const [token, setToken] = useState<string | undefined>(undefined)

  useEffect(() => {
    void getAuth().then((res) => res.ok ? setLoggedIn(true) : undefined)
  }, [])

  const signIn = async (signInOptions?: SignInOptions) => {
    if (!account || !chainId || !library) {
      return
    }
    const signer = library.getSigner()
    const { nonce } = await getNonce()

    const message = new SiweMessage({
      domain: signInOptions?.domain ?? window.location.host,
      address: await signer.getAddress(),
      statement: 'Sign in with Ethereum.',
      uri: signInOptions?.uri ?? window.location.origin,
      version: '1',
      chainId: chainId,
      nonce,
    }).toMessage()
    const signature = await signer.signMessage(message)

    localStorage.setItem('authToken', JSON.stringify({ signature, message }))
    setToken(JSON.stringify({ signature, message }))

    void getAuth().then((res) => res.ok ? setLoggedIn(true) : undefined)
  }

  const signOut = async () => {
    localStorage.removeItem('authToken')
    setLoggedIn(false)
    setToken(undefined)
  }

  const value = {
    signIn,
    signOut,
    isLoggedIn,
    token,
  }

  return <SiweContext.Provider value={value} children={children} />
}
