import { RawCall } from '../providers'
import { Falsy } from '../model/types'
import { useRawCalls } from './useRawCalls'
import { QueryParams } from '../constants/type/QueryParams'

/**
 * @deprecated It's recommended to use useRawCalls instead
 */
export function useChainCalls(calls: (RawCall | Falsy)[], queryParams: QueryParams = {}) {
  const results = useRawCalls(calls, queryParams)
  return results.map((result) => result?.value)
}

/**
 * @deprecated It's recommended to use useRawCall instead
 */
export function useChainCall(call: RawCall | Falsy, queryParams: QueryParams = {}) {
  return useChainCalls([call], queryParams)[0]
}
