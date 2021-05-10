import type { ParsedValue } from './ParsedValue'
import { Interface, FunctionFragment, ParamType } from '@ethersproject/abi'

interface CallParser {
  name: string
  parseCallData(data: string): ParsedValue[]
  parseCallResult(data: string): ParsedValue
}

function makeCallParser(coder: Interface, fragment: FunctionFragment): CallParser {
  return {
    name: fragment.name,
    parseCallData(data: string) {
      try {
        const decoded = coder.decodeFunctionData(fragment, data)
        return fragment.inputs.map((input, i) => parseDecoded(input, decoded[i], i))
      } catch {
        return parseUnknownCallData(data)
      }
    },
    parseCallResult(data: string) {
      try {
        if (fragment.outputs) {
          const decoded = coder.decodeFunctionResult(fragment, data)
          const items = fragment.outputs.map((input, i) => parseDecoded(input, decoded[i], i))
          if (items.length === 1) {
            return items[0]
          } else {
            return { type: 'tuple', name: '#0', value: items }
          }
        } else {
          return parseUnknownCallResult(data)
        }
      } catch {
        return parseUnknownCallResult(data)
      }
    },
  }
}

function parseDecoded(t: ParamType, value: any, index: number): ParsedValue {
  let type: any = t.baseType
  if (type.startsWith('uint') || type.startsWith('int')) {
    type = 'number'
    value = value.toString()
  } else if (type.startsWith('bytes')) {
    type = 'bytes'
    value = normalizeHex(value)
  } else if (type === 'bool') {
    type = 'boolean'
  } else if (type === 'array') {
    const array = []
    for (let i = 0; i < value.length; i++) {
      array.push(parseDecoded(t.arrayChildren, value[i], i))
    }
    value = array
  } else if (type === 'tuple') {
    const array = []
    for (let i = 0; i < value.length; i++) {
      array.push(parseDecoded(t.components[i], value[i], i))
    }
    value = array
  }

  return { type, name: t.name ?? `#${index}`, value }
}

function parseUnknownCallData(data: string): ParsedValue[] {
  const value = normalizeHex(data).substring(8)
  if (value === '') {
    return []
  }
  return [
    {
      type: 'bytes',
      name: 'data',
      value: value,
    },
  ]
}

function parseUnknownCallResult(data: string): ParsedValue {
  return {
    type: 'bytes',
    name: '#0',
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
      }
    }
  }

  clone() {
    const clone = new AbiParser()
    clone.cache = this.cache
    return clone
  }
}
