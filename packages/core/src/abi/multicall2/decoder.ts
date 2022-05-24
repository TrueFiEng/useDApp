import { decodeUint, wordLength, fail } from "../common";

export function decodeTryAggregate(calldata: string) {
  const errorMethodId = '0x08c379a0';
  if (calldata.startsWith(errorMethodId)) {
    throw new Error('Multicall2 aggregate: call failed');
  }
  calldata = calldata.slice(2); // 'remove 0x prefix'
  const getNumber = (offset: number) =>  decodeUint(calldata.slice(offset * wordLength, (offset + 1) * wordLength))

  if (getNumber(0) !== 0x20) {
    fail();
  }
  const arraySize = getNumber(1);
  const calls: [boolean, string][] = []

  for(let i = 0; i < arraySize; i++) {
    const callOffset = 2 * getNumber(i + 2) + 2 * wordLength;
    const pos = callOffset / wordLength;
    const successEncoded = getNumber(pos);
    if (successEncoded !== 1 && successEncoded !== 0) { 
      fail();
    }
    const success = successEncoded === 1;
    if (getNumber(pos + 1) !== 0x40) {
      fail();
    }
    const returnDataOffset = (pos + 3) * wordLength;
    const returnDataLength = getNumber(pos + 2);
    const returnData = calldata.slice(returnDataOffset, returnDataOffset + 2 * returnDataLength);
    const call: [boolean, string] = [
      success,
      '0x' + returnData
    ];
    calls.push(call);
  }
  return [calls]
}
