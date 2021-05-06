import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { AbiParser } from './AbiParser'
import { DEFAULT_ABIS } from './defaultAbis'

export const AbiContext = createContext<AbiParser>(new AbiParser())

interface Props {
  children: ReactNode
}

export function AbiProvider({ children }: Props) {
  const [parser, setParser] = useState(new AbiParser())

  useEffect(() => {
    parser.add(DEFAULT_ABIS)
    setParser(parser.clone())
  }, [])

  return <AbiContext.Provider value={parser} children={children} />
}
