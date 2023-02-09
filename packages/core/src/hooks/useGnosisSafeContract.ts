import { useEffect, useRef } from 'react'
import type { Signer, providers } from 'ethers'
import { Contract } from 'ethers'
import { GNOSIS_SAFE_ABI } from '../helpers/gnosisSafeUtils'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const useGnosisSafeContract = (
  account: string | undefined,
  provider: Signer | providers.Provider | undefined
) => {
  const safeContract = useRef<Contract | undefined>(undefined)

  useEffect(() => {
    return () => {
      safeContract.current?.removeAllListeners()
    }
  }, [])

  return {
    get: () => {
      if (!account || !provider) {
        return undefined
      }

      if (safeContract.current) {
        safeContract.current.removeAllListeners()
      }
      safeContract.current = new Contract(account, GNOSIS_SAFE_ABI, provider)

      return safeContract.current
    },
  }
}
