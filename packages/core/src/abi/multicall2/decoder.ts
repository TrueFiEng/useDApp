import { decodeUint, wordLength, fail } from '../common'

export function decodeTryAggregate(calldata: string) {
  // function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public returns (tuple(bool success, bytes returnData)[])
  const errorMethodId = '0x08c379a0'
  if (calldata.startsWith(errorMethodId)) {
    throw new Error('Multicall2 aggregate: call failed')
  }
  calldata = calldata.slice(2) // 'remove 0x prefix'
  const getNumber = (offset: number) => decodeUint(calldata.slice(offset * wordLength, (offset + 1) * wordLength))

  // The array offset must be 0x20 - nothing is before the array
  if (getNumber(0) !== 0x20) {
    fail()
  }
  const arraySize = getNumber(1)
  const calls: [boolean, string][] = []

  for (let i = 0; i < arraySize; i++) {
    // offset of the call number i
    const callOffset = 2 * getNumber(i + 2) + 2 * wordLength
    // position of the call if we split calldata in chunks of 32 bytes
    const pos = callOffset / wordLength
    // returnData is encoded as a flag showing if the call was successful,
    // data offset, which should be equal to 0x40, data length and the data itself
    const successEncoded = getNumber(pos)
    if (successEncoded !== 1 && successEncoded !== 0) {
      fail()
    }
    const success = successEncoded === 1
    if (getNumber(pos + 1) !== 0x40) {
      fail()
    }
    const returnDataOffset = (pos + 3) * wordLength
    const returnDataLength = getNumber(pos + 2)
    const returnData = calldata.slice(returnDataOffset, returnDataOffset + 2 * returnDataLength)
    const call: [boolean, string] = [success, '0x' + returnData]
    calls.push(call)
  }
  return [calls]
}
