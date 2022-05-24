import { decodeUint, fail, wordLength } from '../common'

export function decodeAggregate(calldata: string) {
  const errorMethodId = '0x08c379a0'
  if (calldata.startsWith(errorMethodId)) {
    throw new Error('Multicall aggregate: call failed')
  }
  calldata = calldata.slice(2) // 'remove 0x prefix'
  const getNumber = (offset: number) => decodeUint(calldata.slice(offset * wordLength, (offset + 1) * wordLength))

  const blockNumber = getNumber(0)
  if (getNumber(1) !== 0x40) {
    fail()
  }
  const arraySize = getNumber(2)
  const calls: string[] = []

  for (let i = 0; i < arraySize; i++) {
    const callOffset = 2 * getNumber(i + 3) + 3 * wordLength
    const pos = callOffset / wordLength
    const returnDataOffset = (pos + 1) * wordLength
    const returnDataLength = getNumber(pos)
    const returnData = calldata.slice(returnDataOffset, returnDataOffset + 2 * returnDataLength)
    calls.push('0x' + returnData)
  }
  return [blockNumber, calls]
}
