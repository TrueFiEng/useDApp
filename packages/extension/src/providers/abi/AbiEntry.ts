import { Interface, FunctionFragment, FormatTypes, JsonFragment, Fragment } from '@ethersproject/abi'

export type AbiInput = Fragment | JsonFragment | string

export interface AbiEntry {
  code: string
  selector: string
  coder: Interface
  fragment: FunctionFragment
}

export function toAbiEntry(abi: AbiInput): AbiEntry | undefined {
  const coder = new Interface([abi])
  const fragment = coder.functions[Object.keys(coder.functions)[0]]
  if (!fragment) {
    return undefined
  }
  const selector = coder.getSighash(fragment)
  const code = fragment.format(FormatTypes.full)
  return { code, coder, fragment, selector }
}

export function toAbiEntries(abi: AbiInput | AbiInput[]) {
  const input = Array.isArray(abi) ? abi : [abi]
  return input.map(toAbiEntry).filter((x): x is AbiEntry => !!x)
}
