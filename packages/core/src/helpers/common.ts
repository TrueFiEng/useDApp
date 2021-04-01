export function shortenString(str: string) {
  return str.substring(0, 6) + '...' + str.substring(str.length - 4)
}
