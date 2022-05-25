export const buffLength = (buf: string) => (buf.length - 2) / 2
export const bufPaddedLength = (buf: string) => Math.ceil(buffLength(buf) / 32) * 32
export const encodeUint = (uint: number) => uint.toString(16).padStart(64, '0')
export const decodeUint = (buf: string) => parseInt(buf, 16)
export const wordLength = 64
export const fail = () => {
  throw new Error('Invalid calldata')
}
