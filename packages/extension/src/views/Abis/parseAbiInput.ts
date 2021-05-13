import { toAbiEntry } from '../../providers/abi/AbiEntry'

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

  if (Array.isArray(parsed)) {
    return parsed.map(toAbiEntry)
  } else {
    return [toAbiEntry(parsed)]
  }
}
