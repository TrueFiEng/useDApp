import { RawCall } from '../providers'
import { Falsy } from '../model/types'
import { useRawCalls } from './useRawCalls'

/**
 * @deprecated It's recommended to use useRawCalls instead
 */
export function useChainCalls(calls: (RawCall | Falsy)[]) {
  const results = useRawCalls(calls)
  return results.map((result) => result?.value)
}

/**
 * @deprecated It's recommended to use useRawCall instead
 */
export function useChainCall(call: RawCall | Falsy) {
  return useChainCalls([call])[0]
}
