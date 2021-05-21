import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { Falsy } from '../model/types'
import { useChainCalls } from './useChainCalls'
import { ChainCall } from '../providers/chainState/callsReducer'

function warnOnInvalidContractCall(call: ContractCall | Falsy) {
  if (!call) {
    console.warn(`Contract call is falsy`)
  } else {
    console.warn(
      `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
    )
  }
}

function resolveCallData(call: ContractCall | Falsy): ChainCall | Falsy {
  if (!call) {
    return undefined
  }

  let callData = undefined
  try {
    callData = call.args.every((arg) => arg !== undefined) && call.abi.encodeFunctionData(call.method, call.args)
  } catch {
    warnOnInvalidContractCall(call)
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
  return useContractCalls([call])[0]
}

export function useContractCalls(calls: (ContractCall | Falsy)[]): (any[] | undefined)[] {
  const results = useChainCalls(calls.map((call) => resolveCallData(call)))

  results.forEach((result, idx) => {
    if (result === '0x') {
      warnOnInvalidContractCall(calls[idx])
    }
  })

  return useMemo(
    () =>
      results.map((result, idx) => {
        const call = calls[idx]
        return call && result != '0x' && result
          ? (call.abi.decodeFunctionResult(call.method, result) as any[])
          : undefined
      }),
    [results]
  )
}
