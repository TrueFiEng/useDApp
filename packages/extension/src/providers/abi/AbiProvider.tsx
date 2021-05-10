import React, { createContext, ReactNode, useState } from 'react'
import { AbiParser } from './AbiParser'
import { DEFAULT_ABIS } from './defaultAbis'

export const AbiContext = createContext<AbiParser>(new AbiParser())
const DEFAULT_PARSER = new AbiParser()
DEFAULT_PARSER.add(DEFAULT_ABIS)

interface Props {
  children: ReactNode
}

export function AbiProvider({ children }: Props) {
  const [parser] = useState(DEFAULT_PARSER)
  return <AbiContext.Provider value={parser} children={children} />
}
