import { RawCall } from '../providers'
import { Falsy } from '../model/types'
import { useRawCalls } from './useRawCalls'

export function useChainCalls(calls: (RawCall | Falsy)[]) {
  const results = useRawCalls(calls)
  return results.map((result) => result?.value)
}

export function useChainCall(call: RawCall | Falsy) {
  return useChainCalls([call])[0]
}
