import { Fragment, Interface, JsonFragment } from 'ethers'

export type AbiInput = Fragment | JsonFragment | string

export interface AbiEntry {
  code: string
  selector: string
  coder: Interface
  fragment: Fragment
}

export function toAbiEntry(abi: AbiInput): AbiEntry | undefined {
  const coder = new Interface([abi])
  if (coder.fragments.length === 0) {
    throw new Error('Invalid ABI')
  }
  const fragment = coder.fragments[0]
  if (!fragment) {
    return undefined
  }
  if (fragment.type === 'function') {
    const selector = coder.getFunction((fragment as any).name)?.selector
    if (!selector) {
      throw new Error('Invalid ABI')
    }
    const code = fragment.format('full')
    return { code, coder, fragment, selector }
  }
  return undefined
}

export function toAbiEntries(abi: AbiInput | AbiInput[]) {
  const input = Array.isArray(abi) ? abi : [abi]
  return input.map(toAbiEntry).filter((x): x is AbiEntry => !!x)
}
