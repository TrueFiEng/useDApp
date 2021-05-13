import React, { createContext, ReactNode, useMemo, useState } from 'react'
import { AbiEntry, toAbiEntry } from './AbiEntry'
import { AbiParser } from './AbiParser'
import { DEFAULT_ABIS } from './defaultAbis'

export interface AbiContextValue {
  abiEntries: AbiEntry[]
  setAbiEntries: (entries: AbiEntry[]) => void
  parser: AbiParser
}
export const AbiContext = createContext<AbiContextValue>({
  abiEntries: [],
  setAbiEntries: () => undefined,
  parser: new AbiParser([]),
})
const DEFAULT_ENTRIES = DEFAULT_ABIS.map(toAbiEntry)

interface Props {
  children: ReactNode
}

export function AbiProvider({ children }: Props) {
  const [abiEntries, setAbiEntries] = useState(DEFAULT_ENTRIES)
  const value = useMemo(() => {
    return {
      abiEntries,
      setAbiEntries,
      parser: new AbiParser(abiEntries),
    }
  }, [abiEntries, setAbiEntries])
  return <AbiContext.Provider value={value} children={children} />
}
