import { Interface, FunctionFragment, FormatTypes } from '@ethersproject/abi'

export interface AbiEntry {
  code: string
  selector: string
  coder: Interface
  fragment: FunctionFragment
}

export function toAbiEntry(abi: any) {
  const coder = new Interface([abi])
  const fragment = coder.functions[Object.keys(coder.functions)[0]]
  const selector = coder.getSighash(fragment)
  const code = fragment.format(FormatTypes.full)
  return { code, coder, fragment, selector }
}
