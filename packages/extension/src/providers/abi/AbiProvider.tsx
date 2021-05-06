import React, { createContext, ReactNode, useState } from 'react'
import { AbiParser } from './AbiParser'

export const AbiContext = createContext<AbiParser>(new AbiParser())

interface Props {
  children: ReactNode
}

export function AbiProvider({ children }: Props) {
  const [parser] = useState(new AbiParser())

  return <AbiContext.Provider value={parser} children={children} />
}
