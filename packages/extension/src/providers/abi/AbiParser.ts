import type { ParsedValue } from './ParsedValue'
import { Interface, FunctionFragment } from '@ethersproject/abi'

interface CallParser {
  name: string
  parseCallData(data: string): ParsedValue[]
  parseCallResult(data: string): ParsedValue | undefined
}

function makeCallParser(coder: Interface, fragment: FunctionFragment): CallParser {
  // TODO: continue work here
  return {
    name: fragment.name,
    parseCallData(data: string) {
      const decoded = coder.decodeFunctionData(fragment, data)
      return fragment.inputs.map((input, i) => {
        let type: any = input.baseType
        if (type.startsWith('uint') || type.startsWith('int')) {
          type = 'number'
        } else if (type.startsWith('bytes')) {
          type = 'bytes'
        }

        return {
          type,
          name: input.name,
          value: decoded[i],
        }
      })
    },
    parseCallResult(data: string) {
      console.log(coder.decodeFunctionResult(fragment, data))
      return undefined
    },
  }
}

function parseUnknownCallData(data: string): ParsedValue[] {
  return [
    {
      type: 'bytes',
      name: 'data',
      value: normalizeHex(data).substring(8),
    },
  ]
}

function parseUnknownCallResult(data: string): ParsedValue {
  return {
    type: 'bytes',
    name: '',
    value: normalizeHex(data),
  }
}

function normalizeHex(value: string) {
  if (value.startsWith('0x')) {
    return value.substring(2).toLowerCase()
  }
  return value.toLowerCase()
}

export class AbiParser {
  private cache: Record<string, CallParser> = {}

  get(selector: string): CallParser {
    const key = normalizeHex(selector)
    if (this.cache[key]) {
      return this.cache[key]
    }
    return {
      name: key,
      parseCallData: parseUnknownCallData,
      parseCallResult: parseUnknownCallResult,
    }
  }

  add(abis: any[]) {
    for (const abi of abis) {
      const coder = new Interface([abi])
      const fragment = coder.functions[Object.keys(coder.functions)[0]]
      if (fragment) {
        const selector = normalizeHex(coder.getSighash(fragment))
        this.cache[selector] = makeCallParser(coder, fragment)
        console.log(this.cache)
      }
    }
  }

  clone() {
    const clone = new AbiParser()
    clone.cache = this.cache
    return clone
  }
}
