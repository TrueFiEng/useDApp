export function toHttpPath(src: string) {
  return src.startsWith('ipfs') ? src.replace('ipfs://', 'https://ipfs.io/ipfs/') : src
}
