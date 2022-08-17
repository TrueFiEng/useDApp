import { decodeUint, fail, wordLength } from '../common'

export function decodeAggregate(calldata: string): [number, string[]] {
  // function aggregate(tuple(address target, bytes callData)[] calls) public returns (tuple(uint256 blockNumber, bytes returnData)[])
  const errorMethodId = '0x08c379a0'
  if (calldata.startsWith(errorMethodId)) {
    throw new Error('Multicall aggregate: call failed')
  }
  calldata = calldata.slice(2) // 'remove 0x prefix'
  const getNumber = (offset: number) => decodeUint(calldata.slice(offset * wordLength, (offset + 1) * wordLength))

  const blockNumber = getNumber(0)
  // The array offset must be 0x40 - blockNumber + array offset
  if (getNumber(1) !== 0x40) {
    fail()
  }
  const arraySize = getNumber(2)
  const calls: string[] = []

  for (let i = 0; i < arraySize; i++) {
    // offset of the call number i
    const callOffset = 2 * getNumber(i + 3) + 3 * wordLength // * 2 because 1 byte = 2 chars
    // position of the call if we split calldata in chunks of 32 bytes
    const pos = callOffset / wordLength
    // returnData is encoded as its length and the data itself
    const returnDataOffset = (pos + 1) * wordLength
    const returnDataLength = getNumber(pos)
    const returnData = calldata.slice(returnDataOffset, returnDataOffset + 2 * returnDataLength) // * 2 because 1 byte = 2 chars
    calls.push('0x' + returnData)
  }
  return [blockNumber, calls]
}
