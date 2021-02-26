import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { Falsy } from '../model/types'
import { useChainCall, useChainCalls } from './useChainCalls'

export interface ContractCall {
  abi: Interface
  address: string
  method: string
  args: any[]
}

export function useContractCall(call: ContractCall | Falsy): any[] | undefined {
  const callData =
    call && call.args.every((arg) => arg !== undefined) && call.abi.encodeFunctionData(call.method, call.args)

  const result = useChainCall(call && callData && { address: call.address, data: callData })

  if (result === '0x') {
    console.warn(
      `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
    )
    return undefined
  }

  return useMemo(
    () => (call && result !== undefined ? (call.abi.decodeFunctionResult(call.method, result) as any[]) : undefined),
    [result]
  )
}

export function useContractCalls(calls: ContractCall[]): (any[] | undefined)[] {
  const results = useChainCalls(
    calls.map((call) => ({
      address: call.address,
      data: call.abi.encodeFunctionData(call.method, call.args),
    }))
  )

  return useMemo(
    () =>
      results.map((result, idx) =>
        result ? (calls[idx].abi.decodeFunctionResult(calls[idx].method, result) as any[]) : undefined
      ),
    [results]
  )
}
