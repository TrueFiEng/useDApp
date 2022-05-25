// number of bytes in the hext string - '0x' at the start doesn't count
// each two characters are one byte
export const buffLength = (buf: string) => (buf.length - 2) / 2
// length of the buffer padded to the nearest 32 bytes
export const bufPaddedLength = (buf: string) => Math.ceil(buffLength(buf) / 32) * 32
export const encodeUint = (uint: number) => uint.toString(16).padStart(64, '0')
export const decodeUint = (buf: string) => parseInt(buf, 16)
// word length in characters - 32 bytes = 64 characters
export const wordLength = 64
export const fail = () => {
  throw new Error('Invalid calldata')
}
