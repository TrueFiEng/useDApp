import { useEthers } from '@usedapp/core'
import { Contract, utils } from 'ethers'
import React, { useEffect, ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { SiweMessage } from 'siwe'
import { GNOSIS_SAFE_ABI } from './constants'
import { SiweFetchers, getFetchers, AuthResponse } from './requests'

export interface SiweContextValue {
  signIn: (signInOptions?: SignInOptions) => void
  signOut: () => void
  isLoggedIn: boolean
  isLoading: boolean
  cancelLoading: () => void
  message: SiweMessage | undefined
  error: Error | undefined
}

const SiweContext = createContext<SiweContextValue>({
  signIn: () => undefined,
  signOut: () => undefined,
  isLoggedIn: false,
  isLoading: false,
  cancelLoading: () => undefined,
  message: undefined,
  error: undefined,
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
const clearStorage = () => {
  localStorage.removeItem('siweMessage')
  localStorage.removeItem('getMessageHash')
}

export const SiweProvider = ({ children, backendUrl, api }: SiweProviderProps) => {
  const { account, chainId, library } = useEthers()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState<SiweMessage | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  const {
    getNonce: getNonceRequest,
    getAuth: getAuthRequest,
    signIn: signInRequest,
    signOut: signOutRequest,
  } = api ?? getFetchers(backendUrl ?? '', { chainId, address: account })

  const getNonceHandler = async () => {
    setError(undefined)
    try {
      const { nonce } = await getNonceRequest()
      return nonce
    } catch (err: any) {
      setError(err)
      setLoading(false)
    }
  }

  const getAuthHandler = async () => {
    setLoading(true)
    setError(undefined)
    try {
      const res: AuthResponse = await getAuthRequest()
      if (res.loggedIn) {
        const siweMessage = res.message as SiweMessage
        setMessage(siweMessage)
        setLoggedIn(true)
      } else {
        setMessage(undefined)
        setLoggedIn(false)
      }

      if (localStorage.getItem('getMessageHash')) {
        const siweMessage = new SiweMessage(JSON.parse(localStorage.getItem('siweMessage') as string))
        void createMultiSigListener({
          message: siweMessage,
        })
        return
      }

      setLoading(false)
    } catch (err: any) {
      setError(err)
      setLoggedIn(false)
      setLoading(false)
    }
  }

  const signOutHandler = async () => {
    setError(undefined)
    try {
      await signOutRequest()
    } catch (err: any) {
      setError(err)
      clearStorage()
    } finally {
      setLoggedIn(false)
      setMessage(undefined)
    }
  }

  const cancelLoading = useCallback(() => {
    clearStorage()
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!account || !chainId) {
      return
    }
    void getAuthHandler()
  }, [account, chainId])

  const signIn = useCallback(
    async (signInOptions?: SignInOptions) => {
      if (!account || !chainId || !library) {
        return
      }
      const signer = 'getSigner' in library ? library.getSigner() : undefined
      if (!signer) return

      setLoading(true)
      const nonce = await getNonceHandler()
      if (!nonce) return

      const message = new SiweMessage({
        domain: signInOptions?.domain ?? window.location.host,
        address: await signer.getAddress(),
        statement: 'Sign in with Ethereum.',
        uri: signInOptions?.uri ?? window.location.origin,
        version: '1',
        chainId,
        nonce,
      })

      const signature = await signer.signMessage(message.prepareMessage()).catch((err) => {
        setError(err)
        setLoading(false)
      })
      if (!signature) return

      try {
        await signInRequest({ signature, message })
      } catch (err: any) {
        return setError(err)
      }

      if (signature === '0x') {
        localStorage.setItem('siweMessage', JSON.stringify(message))
        return createMultiSigListener({
          message,
        })
      }

      void getAuthHandler()
    },
    [account, chainId, library]
  )

  const signOut = useCallback(async () => {
    if (!account || !chainId) {
      return
    }
    await signOutHandler()
  }, [account, chainId])

  const createMultiSigListener = async ({ message }: { message: SiweMessage }) => {
    const gnosisSafeContract = new Contract(message.address, new utils.Interface(GNOSIS_SAFE_ABI), library)

    let getMessageHash = localStorage.getItem('getMessageHash')
    if (!getMessageHash) {
      getMessageHash = await gnosisSafeContract.getMessageHash(utils.hashMessage(message.prepareMessage()))
      localStorage.setItem('getMessageHash', getMessageHash as string)
    }

    const onMultiSigSigned = async () => {
      clearStorage()
      void getAuthHandler()
    }
    gnosisSafeContract.once(gnosisSafeContract.filters.SignMsg(getMessageHash), onMultiSigSigned)
  }

  const value = {
    signIn,
    signOut,
    isLoggedIn,
    isLoading,
    cancelLoading,
    message,
    error,
  }

  return <SiweContext.Provider value={value} children={children} />
}
