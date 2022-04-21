import { useEthers } from '@usedapp/core'
import React, { useEffect, ReactNode, useState } from 'react'
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
  backendUrl: string
  children?: ReactNode
  siweFetchers?: SiweFetchers
}

export const SiweProvider = ({ children, backendUrl, siweFetchers }: SiweProviderProps) => {
  const { account, chainId, library } = useEthers()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [sessionChainId, setSessionChainId] = useState<number | undefined>(undefined)
  const { getNonce, login, logout, getAuth } = siweFetchers ?? getFetchers(backendUrl)

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
      const authResponse = await getAuth()

      if (authResponse.ok && authResponse.address === account) {
        setAddress(authResponse.address)
        setLoggedIn(true)
      }
    }
    void checkAuthStatus()
  }, [account, chainId])

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
      nonce: nonce,
    }).toMessage()
    const signature = await signer.signMessage(message)

    const loginResponse = await login(signature, message)

    if (loginResponse.ok) {
      setSessionChainId(chainId)
      setAddress(loginResponse.address)
      setLoggedIn(true)
    }
  }

  const signOut = async () => {
    const logoutResponse = await logout()

    if (logoutResponse.ok) {
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
