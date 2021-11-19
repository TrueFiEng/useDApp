export function adjustIPFSPath(src: string) {
  return src.startsWith('ipfs') ? src.replace('ipfs://', 'https://ipfs.io/ipfs/') : src
}
