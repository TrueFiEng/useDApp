import { utils } from 'ethers'
import { Call } from '../hooks/useCall'
import { Awaited, ContractMethodNames, Falsy, TypedContract } from '../model/types'
import { RawCall, RawCallResult } from '../providers'
import { addressEqual } from './address'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function warnOnInvalidCall(call: Call | Falsy) {
  if (!call) {
    return
  }
  const { contract, method, args } = call
  console.warn(`Invalid contract call: address=${contract.address} method=${method} args=${args}`)
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function encodeCallData(call: Call | Falsy, chainId: number): RawCall | Falsy {
  if (!call) {
    return undefined
  }
  const { contract, method, args } = call
  if (!contract.address || !method) {
    warnOnInvalidCall(call)
    return undefined
  }
  try {
    return { address: contract.address, data: contract.interface.encodeFunctionData(method, args), chainId }
  } catch {
    warnOnInvalidCall(call)
    return undefined
  }
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function getUniqueCalls(requests: RawCall[]) {
  const unique: RawCall[] = []
  for (const request of requests) {
    if (
      !unique.find(
        (x) => addressEqual(x.address, request.address) && x.data === request.data && x.chainId === request.chainId
      )
    ) {
      unique.push(request)
    }
  }
  return unique
}

/**
 * @public
 */
export type CallResult<T extends TypedContract, MN extends ContractMethodNames<T>> =
  | { value: Awaited<ReturnType<T['functions'][MN]>>; error: undefined }
  | { value: undefined; error: Error }
  | undefined

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function decodeCallResult<T extends TypedContract, MN extends ContractMethodNames<T>>(
  call: Call | Falsy,
  result: RawCallResult
): CallResult<T, MN> {
  if (!result || !call) {
    return undefined
  }
  const { value, success } = result
  try {
    if (success) {
      return {
        value: call.contract.interface.decodeFunctionResult(call.method, value) as Awaited<
          ReturnType<T['functions'][MN]>
        >,
        error: undefined,
      }
    } else {
      const errorMessage: string = new utils.Interface(['function Error(string)']).decodeFunctionData('Error', value)[0]
      return {
        value: undefined,
        error: new Error(errorMessage),
      }
    }
  } catch (error) {
    return {
      value: undefined,
      error: error as Error,
    }
  }
}
