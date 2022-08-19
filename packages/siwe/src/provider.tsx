import { useEthers } from '@usedapp/core'
import React, { useEffect, ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { SiweMessage } from 'siwe'
import { SiweFetchers, getFetchers } from './requests'
import { Contract, utils } from 'ethers'
import { Interface } from 'ethers/lib/utils'

const GNOSIS_SAFE_ABI = [
  'event SignMsg(bytes32 indexed msgHash)',
  'function getMessageHash(bytes memory message) public view returns (bytes32)',
  'function signedMessages(bytes32 msgHash) public view returns (uint256)',
  'function isValidSignature(bytes calldata _data, bytes calldata _signature) public view returns (bytes4)',
]

export interface SiweContextValue {
  signIn: (signInOptions?: SignInOptions) => void
  signOut: () => void
  isLoggedIn: boolean
  isLoading: boolean
  message: SiweMessage | undefined
}

const SiweContext = createContext<SiweContextValue>({
  signIn: () => undefined,
  signOut: () => undefined,
  isLoggedIn: false,
  isLoading: false,
  message: undefined,
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
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState<SiweMessage | undefined>(undefined)
  const { getNonce, getAuth, signIn, signOut } = api ?? getFetchers(backendUrl ?? '')

  const createGnosisSafeListener = async ({ message }: { message: SiweMessage }) => {
    console.log('Creating listener for Gnosis Safe')
    const gnosisSafeContract = new Contract(message.address, new Interface(GNOSIS_SAFE_ABI), library)

    let getMessageHash = localStorage.getItem('getMessageHash')
    if (!getMessageHash) {
      getMessageHash = await gnosisSafeContract.getMessageHash(utils.hashMessage(message.prepareMessage()))
      localStorage.setItem('getMessageHash', getMessageHash as string)
    }

    console.log({ getMessageHash })

    const onMultiSigSigned = async (signedMessageHash: any) => {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      console.log('MultiSig signed', { getMessageHash, signedMessageHash })
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      gnosisSafeContract.removeListener(gnosisSafeContract.filters.SignMsg(getMessageHash), onMultiSigSigned)
      void getAuthHandler()
    }
    gnosisSafeContract.once(gnosisSafeContract.filters.SignMsg(getMessageHash), onMultiSigSigned)
  }

  const getAuthHandler = async () => {
    setLoading(true)
    const res = await getAuth()
    if (res.loggedIn) {
      setLoading(false)
      const siweMessage = res.message as SiweMessage
      setMessage(siweMessage)
      if (siweMessage.address !== account || siweMessage.chainId !== chainId) {
        console.error('Address or chainId mismatch', siweMessage)
        return setLoggedIn(false)
      }
      return setLoggedIn(true)
    }
    if (localStorage.getItem('getMessageHash')) {
      const siweMessage = new SiweMessage(JSON.parse(localStorage.getItem('siweMessage') as string))
      return createGnosisSafeListener({
        message: siweMessage,
      })
    }
    setLoading(false)
    setLoggedIn(false)
  }

  const signOutHandler = async () => {
    await signOut()
    localStorage.removeItem('siweMessage')
    localStorage.removeItem('getMessageHash')
    setLoggedIn(false)
    setMessage(undefined)
  }

  useEffect(() => {
    if (!account || !chainId) {
      return
    }
    void getAuthHandler()
  }, [account, chainId])

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
      localStorage.setItem('siweMessage', JSON.stringify(message))

      setLoading(true)
      const signature = await signer.signMessage(message.prepareMessage()).catch(() => {
        setLoading(false)
      })
      if (!signature) {
        return
      }

      await signIn({ signature, message })

      if (signature === '0x') {
        return createGnosisSafeListener({
          message,
        })
      }

      void getAuthHandler()
    },
    [account, chainId, library]
  )

  const handleSignOut = useCallback(async () => {
    if (!account || !chainId) {
      return
    }
    await signOutHandler()
  }, [account, chainId])

  const value = {
    signIn: handleSignIn,
    signOut: handleSignOut,
    isLoggedIn,
    isLoading,
    message,
  }

  return <SiweContext.Provider value={value} children={children} />
}
