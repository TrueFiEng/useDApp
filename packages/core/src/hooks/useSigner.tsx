import { useEthers } from './useEthers'
import { useState, useEffect } from 'react'
import { JsonRpcSigner } from '@ethersproject/providers'

/**
 * Returns a signer.
 * @returns a JsonRpcSigner if one is available in the provider. 'undefined' otherwise.
 */
export function useSigner(): JsonRpcSigner | undefined {
  const { library, account } = useEthers()
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>()

  useEffect(() => {
    if (library !== undefined && 'getSigner' in library) setSigner(library.getSigner())
    else setSigner(undefined)
  }, [library])

  return signer
}
