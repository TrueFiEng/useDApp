import { toAbiEntries } from '../../providers/abi/AbiEntry'

export function parseAbiInput(input: string) {
  let parsed
  try {
    parsed = JSON.parse(input)
  } catch {
    parsed = input
      .split('\n')
      .map((x) => x.trim())
      .filter((x) => x !== '')
  }
  return toAbiEntries(parsed)
}
