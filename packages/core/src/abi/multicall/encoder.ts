import { encodeUint } from '../common'
import { encodeCalls } from '../multicall2/encoder'
import { ethersAbi } from './constants'

const selector = ethersAbi.getSighash('aggregate')

export function encodeAggregate(calls: [string, string][]) {
  // head params
  const dynamicOffset = 0x20
  let res = selector
  res += encodeUint(dynamicOffset)

  return encodeCalls(res, calls)
}
