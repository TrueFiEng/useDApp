import { utils } from 'ethers'
import { Call } from '../hooks/useCall'
import { Falsy } from '../model/types'
import { RawCall, RawCallResult } from '../providers'
import { addressEqual } from './address'

export function warnOnInvalidCall(call: Call | Falsy) {
  if (!call) {
    return
  }
  const { contract, method, args } = call
  console.warn(`Invalid contract call: address=${contract.address} method=${method} args=${args}`)
}

export function encodeCallData(call: Call | Falsy): RawCall | Falsy {
  if (!call) {
    return undefined
  }
  const { contract, method, args } = call
  if (!contract.address || !method) {
    warnOnInvalidCall(call)
    return undefined
  }
  try {
    return { address: contract.address, data: contract.interface.encodeFunctionData(method, args) }
  } catch {
    warnOnInvalidCall(call)
    return undefined
  }
}

export function getUniqueCalls(requests: RawCall[]) {
  const unique: RawCall[] = []
  for (const request of requests) {
    if (!unique.find((x) => addressEqual(x.address, request.address) && x.data === request.data)) {
      unique.push(request)
    }
  }
  return unique
}

export class CallError {
  constructor(readonly message: string) {}
}

type LoadingResult = { status: 'Loading' }
type ErrorResult = { status: 'Error', error: CallError }
type SuccessResult = { status: 'Success', value: any[] }
export type CallResult = LoadingResult | ErrorResult | SuccessResult

export function decodeCallResult(call: Call | Falsy, result: RawCallResult): CallResult {
  if (!result || !call) {
    return { status: 'Loading' }
  }
  const { value, success } = result
  if (success) {
    return { 
      status: 'Success',
      value: call.contract.interface.decodeFunctionResult(call.method, value) as any[]
    }
  } else {
    const errorMessage: string = new utils.Interface(['function Error(string)']).decodeFunctionData('Error', value)[0]
    return {
      status: 'Error',
      error: new CallError(errorMessage)
    }
  }
}
