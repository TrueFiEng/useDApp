import { ethersAbi, falseEncoded, trueEncoded } from "./constants";

const selector = ethersAbi.getSighash('tryAggregate') 

export function encodeTryAggregate(b: boolean, calls: [string, string][]) {
  const buffLength = (buf: string) => (buf.length - 2) / 2
  const bufPaddedLength = (buf: string) => Math.ceil(buffLength(buf) / 32) * 32
  const encodeUint = (uint: number) => uint.toString(16).padStart(64, '0')

  let res = selector;
  let dynamicOffset;

  // head params
  dynamicOffset = 0x40;
  res += b ? trueEncoded : falseEncoded;
  res += encodeUint(dynamicOffset)

  // array
  dynamicOffset = calls.length * 0x20
  res += encodeUint(calls.length)
  for(const call of calls) {
    res += encodeUint(dynamicOffset)
    dynamicOffset += 3 * 0x20 + bufPaddedLength(call[1])
  }

  // tuples
  for(const call of calls) {
    // address + calldata ptr
    dynamicOffset = 0x40;
    res += '000000000000000000000000' + call[0].slice(2).toLowerCase()
    res += encodeUint(dynamicOffset)

    // calldata
    res += buffLength(call[1]).toString(16).padStart(64, '0')
    res += call[1].slice(2).padEnd(bufPaddedLength(call[1]) * 2, '0')
  }

  return res
}
