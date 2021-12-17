import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { ContractMethodNames, Falsy, Params, TypedContract, Awaited } from '../model/types'
import { useChainCalls } from './useChainCalls'
import { ChainCall } from '../providers/chainState/callsReducer'

function warnOnInvalidContractCall(call: ContractCall | Falsy) {
  console.warn(
    `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
  )
}

function encodeCallData(call: ContractCall | Falsy): ChainCall | Falsy {
  if (!call || !call.address || !call.method) {
    warnOnInvalidContractCall(call)
    return undefined
  }
  try {
    return { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args) }
  } catch {
    warnOnInvalidContractCall(call)
    return undefined
  }
}

export interface ContractCall<T = string> {
  abi: Interface
  address: string
  method: T
  args: any[]
}

export interface TypedContractCall<T extends TypedContract, MN extends ContractMethodNames<T>> {
  contract: T
  typedMethod: MN
  typedArgs: Params<T, MN>
}

export function useContractCall<T extends TypedContract, MN extends ContractMethodNames<T> & string>(
  call: TypedContractCall<T, MN> | Falsy | ContractCall<MN>
): Awaited<ReturnType<T['functions'][MN]>> | undefined {
  return useContractCalls([call])[0]
}

export function useContractCalls<T extends TypedContract, MN extends ContractMethodNames<T>>(
  calls: (TypedContractCall<T, MN> | Falsy | ContractCall<string>)[]
): (Awaited<ReturnType<T['functions'][MN]>> | undefined)[] {
  const mappedCalls = calls.map((call): ContractCall | Falsy => {
    if (!call) return call
    if ('contract' in call) {
      return {
        abi: call.contract.interface,
        address: call.contract.address,
        method: call.typedMethod,
        args: call.typedArgs,
      }
    }
    return call
  })
  const results = useChainCalls(mappedCalls.map(encodeCallData))

  return useMemo(
    () =>
      results.map((result, idx) => {
        const call = mappedCalls[idx]
        if (result === '0x') {
          warnOnInvalidContractCall(call)
          return undefined
        }
        return call && result ? (call.abi.decodeFunctionResult(call.method, result) as any) : undefined
      }),
    [results]
  )
}
