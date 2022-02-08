import { RawCall } from '../providers'
import { Falsy } from '../model/types'
import { useRawCalls } from './useRawCalls'
import { ChainId } from '../constants'

/**
 * @deprecated It's recommended to use useRawCalls instead
 */
export function useChainCalls(calls: (RawCall | Falsy)[], chainId?: ChainId) {
  const results = useRawCalls(calls, chainId)
  return results.map((result) => result?.value)
}

/**
 * @deprecated It's recommended to use useRawCall instead
 */
export function useChainCall(call: RawCall | Falsy, chainId?: ChainId) {
  return useChainCalls([call], chainId)[0]
}
