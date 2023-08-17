import { AbiCoder, Fragment, FunctionFragment, Interface, JsonFragment } from "ethers"

export type AbiInput = Fragment | JsonFragment | string

export interface AbiEntry {
  code: string
  selector: string
  coder: Interface
  fragment: Fragment
}

export function toAbiEntry(abi: AbiInput): AbiEntry | undefined {
  const coder = new Interface([abi])
  const fragment = coder.fragments[0]
  if (!fragment) {
    return undefined
  }
  const selector = fragment.format('sighash')
  const code = fragment.format('full')
  return { code, coder, fragment, selector }
}

export function toAbiEntries(abi: AbiInput | AbiInput[]) {
  const input = Array.isArray(abi) ? abi : [abi]
  return input.map(toAbiEntry).filter((x): x is AbiEntry => !!x)
}
