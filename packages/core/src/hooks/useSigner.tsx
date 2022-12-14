import { useEthers } from './useEthers'
import { useState, useEffect } from 'react'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

export function useSigner(): JsonRpcSigner | undefined {
  const { library, account } = useEthers()
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>()

  useEffect(() => {
    if (account) setSigner((library as JsonRpcProvider).getSigner())
    else setSigner(undefined)
  }, [account, library])

  return signer
}
