import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { Falsy } from '../model/types'
import { useChainCall, useChainCalls } from './useChainCalls'
import { ChainCall } from '../providers/chainState/callsReducer'

function resolveCallData(call: ContractCall | Falsy): ChainCall | Falsy {
  if (!call) {
    return undefined
  }

  let callData = undefined
  try {
    callData = call.args.every((arg) => arg !== undefined) && call.abi.encodeFunctionData(call.method, call.args)
  } catch {
    console.warn(
      `Invalid callData: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
    )
  }

  return callData && { address: call.address, data: callData }
}

export interface ContractCall {
  abi: Interface
  address: string
  method: string
  args: any[]
}

export function useContractCall(call: ContractCall | Falsy): any[] | undefined {
  const result = useChainCall(resolveCallData(call))

  const memoReturn = useMemo(
    () =>
      call && result != '0x' && result !== undefined
        ? (call.abi.decodeFunctionResult(call.method, result) as any[])
        : undefined,
    [result]
  )

  if (result === '0x') {
    console.warn(
      `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
    )
    return undefined
  }
  return memoReturn
}

export function useContractCalls(calls: ContractCall[]): (any[] | undefined)[] {
  const filteredCalls = calls.map((call) => resolveCallData(call)).filter((call) => call) as ChainCall[]
  const results = useChainCalls(filteredCalls)

  return useMemo(
    () =>
      results.map((result, idx) =>
        result != '0x' && result ? (calls[idx].abi.decodeFunctionResult(calls[idx].method, result) as any[]) : undefined
      ),
    [results]
  )
}
