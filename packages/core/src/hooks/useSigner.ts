import { JsonRpcSigner } from 'ethers'
import { useEthers } from './useEthers'
import { useState, useEffect } from 'react'

/**
 * Returns a signer if an external wallet is connected.
 * @public
 * @returns a JsonRpcSigner if one is available in the provider. `undefined` otherwise.
 */
export function useSigner(): JsonRpcSigner | undefined {
  const { library, account } = useEthers()
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>()

  useEffect(() => {
    (async () => {
      if (library !== undefined && 'getSigner' in library && account !== undefined) setSigner(await library.getSigner())
      else setSigner(undefined)
    })()
  }, [library, account])

  return signer
}
