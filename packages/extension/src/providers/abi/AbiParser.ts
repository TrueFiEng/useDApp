import type { ParsedValue } from './ParsedValue'

interface CallParser {
  name: string
  parseCallData(data: string): ParsedValue[]
  parseCallResult(data: string): ParsedValue
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

  clone() {
    const clone = new AbiParser()
    clone.cache = this.cache
    return clone
  }
}
