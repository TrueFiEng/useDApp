import { encodeUint } from '../common'
import { encodeCalls } from '../multicall2/encoder'
import { ethersAbi } from './constants'

const selector = ethersAbi.getSighash('aggregate')

export function encodeAggregate(calls: [string, string][]) {
  // function aggregate(tuple(address target, bytes callData)[] calls) public returns (tuple(uint256 blockNumber, bytes returnData)[])

  // offset of the array is 0x20 because the only thing
  // that goes before the array is the offset itself
  const dynamicOffset = 0x20
  const res = selector + encodeUint(dynamicOffset)

  // encode dynamic array of calls
  return encodeCalls(res, calls)
}
