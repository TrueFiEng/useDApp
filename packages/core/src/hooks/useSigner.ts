import { useEthers } from './useEthers'
import { JsonRpcSigner } from '@ethersproject/providers'

/**
 * Returns a signer if an external wallet is connected.
 * @public
 * @returns a JsonRpcSigner if one is available in the provider. `undefined` otherwise.
 */
export function useSigner(): JsonRpcSigner | undefined {
  const { library, account } = useEthers()
  if (library === undefined || account === undefined || !('getSigner' in library)) return undefined
  return library.getSigner(account)
}
