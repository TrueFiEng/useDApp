import { utils } from 'ethers'
import { Call } from '../hooks/useCall'
import { Awaited, ContractMethodNames, Falsy, TypedContract } from '../model/types'
import { RawCall, RawCallResult } from '../providers'
import { QueryParams } from '../constants/type/QueryParams'

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
export function encodeCallData(call: Call | Falsy, chainId: number, queryParams: QueryParams = {}): RawCall | Falsy {
  if (!call) {
    return undefined
  }
  const { contract, method, args } = call
  if (!contract.address || !method) {
    warnOnInvalidCall(call)
    return undefined
  }
  try {
    const isStatic = queryParams.isStatic ?? queryParams.refresh === 'never'
    const refreshPerBlocks = typeof queryParams.refresh === 'number' ? queryParams.refresh : undefined

    return {
      address: contract.address,
      data: contract.interface.encodeFunctionData(method, args),
      chainId,
      isStatic,
      refreshPerBlocks,
    }
  } catch {
    warnOnInvalidCall(call)
    return undefined
  }
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function getUniqueActiveCalls(requests: RawCall[]) {
  const unique: RawCall[] = []
  const used: Record<string, boolean> = {}
  for (const request of requests) {
    if (request.isDisabled) {
      continue
    }
    if (!used[`${request.address.toLowerCase()}${request.data}${request.chainId}`]) {
      unique.push(request)
      used[`${request.address.toLowerCase()}${request.data}${request.chainId}`] = true
    }
  }
  return unique
}

/**
 * Result of a multicall call.
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
