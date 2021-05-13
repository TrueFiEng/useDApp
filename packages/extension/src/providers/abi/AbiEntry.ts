import { Interface, FunctionFragment, FormatTypes } from '@ethersproject/abi'

export interface AbiEntry {
  code: string
  selector: string
  coder: Interface
  fragment: FunctionFragment
}

export function toAbiEntry(abi: any): AbiEntry | undefined {
  const coder = new Interface([abi])
  const fragment = coder.functions[Object.keys(coder.functions)[0]]
  if (!fragment) {
    return undefined
  }
  const selector = coder.getSighash(fragment)
  const code = fragment.format(FormatTypes.full)
  return { code, coder, fragment, selector }
}

export function toAbiEntries(abi: any) {
  const input = Array.isArray(abi) ? abi : [abi]
  return input.map(toAbiEntry).filter((x): x is AbiEntry => !!x)
}
