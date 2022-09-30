import { useEthers } from '@usedapp/core'
import { Contract, ethers, providers, utils } from 'ethers'
import React, { useEffect, ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { SiweMessage } from 'siwe'
import { GNOSIS_SAFE_ABI } from './constants'
import { SiweFetchers, getFetchers } from './requests'

export interface SiweContextValue {
  signIn: (signInOptions?: SignInOptions) => void
  signOut: () => void
  isLoggedIn: boolean
  isLoading: boolean
  cancelLoading: () => void
  message: SiweMessage | undefined
  error: any
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
  const [error, setError] = useState<any>(undefined)
  const { getNonce, getAuth, signIn, signOut } = api ?? getFetchers(backendUrl ?? '')

  const getAuthRequestHandler = () => {
    setLoading(true)
    setError(undefined)
    getAuth()
      .then((res) => {
        if (res.loggedIn) {
          const siweMessage = res.message as SiweMessage
          setMessage(siweMessage)
          setLoading(false)
          if (siweMessage.address !== account) {
            setError(new Error('Account mismatch'))
            return setLoggedIn(false)
          }
          if (siweMessage.chainId !== chainId) {
            setError(new Error('ChainId mismatch'))
            return setLoggedIn(false)
          }
          return setLoggedIn(true)
        }
        if (localStorage.getItem('getMessageHash')) {
          const siweMessage = new SiweMessage(JSON.parse(localStorage.getItem('siweMessage') as string))
          void createMultiSigListener({
            message: siweMessage,
          })
        } else {
          setLoading(false)
        }
        setLoggedIn(false)
      })
      .catch((err) => {
        setError(err)
        setLoggedIn(false)
        setLoading(false)
      })
  }

  const signOutRequestHandler = async () => {
    setError(undefined)
    try {
      await signOut()
    } catch (err) {
      setError(err)
    } finally {
      clearStorage()
      setLoggedIn(false)
      setMessage(undefined)
    }
  }

  const getNonceRequestHandler = async () => {
    setError(undefined)
    try {
      const { nonce } = await getNonce()
      return nonce
    } catch (err) {
      setError(err)
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
    void getAuthRequestHandler()
  }, [account, chainId])

  const handleSignIn = useCallback(
    async (signInOptions?: SignInOptions) => {
      if (!account || !chainId || !library) {
        return
      }
      const signer = ('getSigner' in library) ? library.getSigner() : undefined
      if (!signer) return
      const nonce = await getNonceRequestHandler()

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

      setLoading(true)
      const signature = await signer.signMessage(message.prepareMessage()).catch((err) => {
        setError(err)
        setLoading(false)
      })
      if (!signature) {
        return
      }

      try {
        await signIn({ signature, message })
      } catch (err) {
        return setError(err)
      }

      if (signature === '0x') {
        localStorage.setItem('siweMessage', JSON.stringify(message))
        return createMultiSigListener({
          message,
        })
      }

      void getAuthRequestHandler()
    },
    [account, chainId, library]
  )

  const handleSignOut = useCallback(async () => {
    if (!account || !chainId) {
      return
    }
    await signOutRequestHandler()
  }, [account, chainId])

  const createMultiSigListener = async ({ message }: { message: SiweMessage }) => {
    const gnosisSafeContract = new Contract(message.address, new utils.Interface(GNOSIS_SAFE_ABI), library)

    let getMessageHash = localStorage.getItem('getMessageHash')
    if (!getMessageHash) {
      getMessageHash = await gnosisSafeContract.getMessageHash(utils.hashMessage(message.prepareMessage()))
      localStorage.setItem('getMessageHash', getMessageHash as string)
    }

    const onMultiSigSigned = async () => {
      gnosisSafeContract.removeListener(gnosisSafeContract.filters.SignMsg(getMessageHash), onMultiSigSigned)
      localStorage.removeItem('getMessageHash')
      localStorage.removeItem('siweMessage')
      void getAuthRequestHandler()
    }
    gnosisSafeContract.once(gnosisSafeContract.filters.SignMsg(getMessageHash), onMultiSigSigned)
  }

  const value = {
    signIn: handleSignIn,
    signOut: handleSignOut,
    isLoggedIn,
    isLoading,
    cancelLoading,
    message,
    error,
  }

  return <SiweContext.Provider value={value} children={children} />
}
