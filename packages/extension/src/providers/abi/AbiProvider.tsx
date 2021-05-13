import React, { createContext, ReactNode, useMemo, useState } from 'react'
import { AbiEntry, toAbiEntries } from './AbiEntry'
import { AbiParser } from './AbiParser'
import { DEFAULT_ABIS } from './defaultAbis'

export interface AbiContextValue {
  userAbis: AbiEntry[]
  setUserAbis: (entries: AbiEntry[]) => void
  parser: AbiParser
}
export const AbiContext = createContext<AbiContextValue>({
  userAbis: [],
  setUserAbis: () => undefined,
  parser: new AbiParser([]),
})
export const DEFAULT_ENTRIES = toAbiEntries(DEFAULT_ABIS)

interface Props {
  children: ReactNode
}

export function AbiProvider({ children }: Props) {
  const [userAbis, setUserAbis] = useState<AbiEntry[]>([])
  const value = useMemo(() => {
    return {
      userAbis,
      setUserAbis,
      parser: new AbiParser([...userAbis, ...DEFAULT_ENTRIES].reverse()),
    }
  }, [userAbis, setUserAbis])
  return <AbiContext.Provider value={value} children={children} />
}
