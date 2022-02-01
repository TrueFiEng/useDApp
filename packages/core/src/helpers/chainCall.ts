import { Call } from '../hooks/useCall'
import { Falsy } from '../model/types'
import { RawCall } from '../providers'
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
