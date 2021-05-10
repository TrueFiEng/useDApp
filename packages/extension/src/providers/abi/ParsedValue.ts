export type ParsedValue =
  | ParsedTuple
  | ParsedAddress
  | ParsedNumber
  | ParsedBoolean
  | ParsedString
  | ParsedArray
  | ParsedBytes

export interface ParsedTuple {
  type: 'tuple'
  name: string
  value: ParsedValue[]
}

export interface ParsedArray {
  type: 'array'
  name: string
  value: ParsedValue[]
}

export interface ParsedAddress {
  type: 'address'
  name: string
  value: string
}

export interface ParsedNumber {
  type: 'number'
  name: string
  value: string
}

export interface ParsedBoolean {
  type: 'boolean'
  name: string
  value: boolean
}

export interface ParsedString {
  type: 'string'
  name: string
  value: string
}

export interface ParsedBytes {
  type: 'bytes'
  name: string
  value: string
}
