
import { ChainCall } from '../providers'
import { Falsy } from '../model/types'
import { useFailableChainCalls } from './useFailableChainCalls'

export function useChainCalls(calls: (ChainCall | Falsy)[]) {
  const results = useFailableChainCalls(calls)
  return results.map((result) => result?.value)
}

export function useChainCall(call: ChainCall | Falsy) {
  return useChainCalls([call])[0]
}
