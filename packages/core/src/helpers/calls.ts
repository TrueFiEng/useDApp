import { BigNumber, utils } from 'ethers'
import { Call } from '../hooks/useCall'
import { Awaited, ContractMethodNames, Falsy, TypedContract } from '../model/types'
import { RawCall, RawCallResult } from '../providers'
import { QueryParams } from '../constants/type/QueryParams'
import { ChainId } from '../constants/chainId'
import { defaultMulticall1ErrorMessage } from '../abi/multicall/constants'

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
export function validateCall(call: Call): Call {
  const { contract, method, args } = call
  if (!contract.address || !method) {
    throw new Error('Missing contract address or method name')
  }

  try {
    contract.interface.encodeFunctionData(method, args)
    return call
  } catch (err: any) {
    throw new Error(`Invalid contract call for method="${method}" on contract="${contract.address}": ${err.message}`)
  }
}

/**
 * @internal Intended for internal use - use it on your own risk
 * @returns
 * One of these:
 * - a RawCall, if encoding is successful.
 * - Falsy, if there is no call to encode.
 * - an Error, if encoding fails (e.g. because of mismatched arguments).
 */
export function encodeCallData(
  call: Call | Falsy,
  chainId: number,
  queryParams: QueryParams = {}
): RawCall | Falsy | Error {
  if (!call) {
    return undefined
  }
  try {
    validateCall(call)
  } catch (e: any) {
    return e
  }
  const { contract, method, args } = call
  const isStatic = queryParams.isStatic ?? queryParams.refresh === 'never'
  const refreshPerBlocks = typeof queryParams.refresh === 'number' ? queryParams.refresh : undefined

  return {
    address: contract.address,
    data: contract.interface.encodeFunctionData(method, args),
    chainId,
    isStatic,
    refreshPerBlocks,
  }
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function getUniqueActiveCalls(requests: RawCall[]) {
  const unique: RawCall[] = []
  const used: Record<string, boolean> = {}
  for (const request of requests) {
    if (!used[`${request.address.toLowerCase()}${request.data}${request.chainId}`]) {
      unique.push(request)
      used[`${request.address.toLowerCase()}${request.data}${request.chainId}`] = true
    }
  }
  return unique
}

export interface RefreshOptions {
  blockNumber?: number
  chainId?: ChainId
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function getCallsForUpdate(requests: RawCall[], options?: RefreshOptions) {
  const callsForUpdate: RawCall[] = []
  for (const request of requests) {
    if (options) {
      if (options.chainId && options.chainId !== request.chainId) {
        continue
      }
      if (request.isStatic && request.lastUpdatedBlockNumber !== undefined) {
        continue
      }
      const currentBlock = options.blockNumber
      if (currentBlock && request.lastUpdatedBlockNumber && request.refreshPerBlocks) {
        if (currentBlock < request.lastUpdatedBlockNumber + request.refreshPerBlocks) {
          continue
        }
      }
    }
    callsForUpdate.push(request)
  }
  return callsForUpdate
}

/**
 * Result of a {@link useCall} query.
 *
 * It is `undefined` when call didn't return yet or a object `{ value, error }` if it did.
 *
 * - `value:` `any[] | undefined` - array of results or undefined if error occurred,
 * - `error`: `Error | undefined` - encountered error or undefined if call was successful.
 *
 * @public
 */
export type CallResult<T extends TypedContract, MN extends ContractMethodNames<T>> =
  | { value: Awaited<ReturnType<T['functions'][MN]> | undefined>; error: Error | undefined }
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
      const errorMessage: string = tryDecodeErrorData(value, call.contract.interface) ?? 'Unknown error'
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

function tryDecodeErrorData(data: string, contractInterface: utils.Interface): string | undefined {
  if (data === '0x') {
    return 'Call reverted without a cause message'
  }

  if (data.startsWith('0x08c379a0')) {
    // decode Error(string)
    const reason: string = new utils.Interface(['function Error(string)']).decodeFunctionData('Error', data)[0]
    if (reason.startsWith('VM Exception')) {
      return defaultMulticall1ErrorMessage
    }
    return reason
  }

  if (data.startsWith('0x4e487b71')) {
    // decode Panic(uint)
    const code: BigNumber = new utils.Interface(['function Panic(uint)']).decodeFunctionData('Panic', data)[0]
    return `panic code ${code._hex}`
  }

  try {
    const errorInfo = contractInterface.parseError(data)
    return `error ${errorInfo.name}`
  } catch (e) {
    console.error(e)
  }
}
