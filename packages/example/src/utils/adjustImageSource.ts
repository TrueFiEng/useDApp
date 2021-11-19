export function adjustImageSource(src: string) {
  return src.startsWith('ipfs') ? src.replace('ipfs://', 'https://ipfs.io/ipfs/') : src
}
