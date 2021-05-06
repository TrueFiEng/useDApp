export type ParsedValue =
  | ParsedObject
  | ParsedAddress
  | ParsedNumber
  | ParsedBoolean
  | ParsedString
  | ParsedArray
  | ParsedBytes

export interface ParsedObject {
  type: 'object'
  name: string
  properties: ParsedValue[]
}

export interface ParsedArray {
  type: 'array'
  name: string
  values: ParsedValue[]
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
