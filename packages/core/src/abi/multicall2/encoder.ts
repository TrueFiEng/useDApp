import { encodeUint, bufPaddedLength, buffLength } from '../common'
import { ethersAbi, falseEncoded, trueEncoded } from './constants'

const selector = ethersAbi.getSighash('tryAggregate')

export function encodeCalls(start: string, calls: [string, string][]) {
  let res = start
  // the first offset is calls.length * 0x20 because the first
  // item of a dynamic array starts after all offsets
  let dynamicOffset = calls.length * 0x20
  // number of items in the array
  res += encodeUint(calls.length)
  for (const call of calls) {
    // offset of the current call
    res += encodeUint(dynamicOffset)
    // offset for the next call - current offset
    // + length of the current call
    // + space taken by the current offset
    // + the first item in the next tuple - address for the next call
    // + space taken by the offset for the next call data
    dynamicOffset += 3 * 0x20 + bufPaddedLength(call[1])
  }

  for (const call of calls) {
    // address + calldata offset
    dynamicOffset = 0x40
    res += '000000000000000000000000' + call[0].slice(2).toLowerCase()
    res += encodeUint(dynamicOffset)

    // call data length
    res += buffLength(call[1]).toString(16).padStart(64, '0')
    // calldata
    res += call[1].slice(2).padEnd(bufPaddedLength(call[1]) * 2, '0')
  }

  return res
}

export function encodeTryAggregate(b: boolean, calls: [string, string][]) {
  // function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public returns (tuple(bool success, bytes returnData)[])
  let res = selector

  // offset of the array is 0x40 because we need to
  // encode requireSuccess flag and the offset itself
  const dynamicOffset = 0x40
  res += b ? trueEncoded : falseEncoded
  res += encodeUint(dynamicOffset)

  // encode dynamic array of calls
  return encodeCalls(res, calls)
}
