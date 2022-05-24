import { encodeUint, bufPaddedLength, buffLength } from '../common'
import { ethersAbi, falseEncoded, trueEncoded } from './constants'

const selector = ethersAbi.getSighash('tryAggregate')

export function encodeCalls(start: string, calls: [string, string][]) {
  let res = start
  // array
  let dynamicOffset = calls.length * 0x20
  res += encodeUint(calls.length)
  for (const call of calls) {
    res += encodeUint(dynamicOffset)
    dynamicOffset += 3 * 0x20 + bufPaddedLength(call[1])
  }

  // tuples
  for (const call of calls) {
    // address + calldata ptr
    dynamicOffset = 0x40
    res += '000000000000000000000000' + call[0].slice(2).toLowerCase()
    res += encodeUint(dynamicOffset)

    // calldata
    res += buffLength(call[1]).toString(16).padStart(64, '0')
    res += call[1].slice(2).padEnd(bufPaddedLength(call[1]) * 2, '0')
  }

  return res
}

export function encodeTryAggregate(b: boolean, calls: [string, string][]) {
  let res = selector

  // head params
  const dynamicOffset = 0x40
  res += b ? trueEncoded : falseEncoded
  res += encodeUint(dynamicOffset)

  return encodeCalls(res, calls)
}
