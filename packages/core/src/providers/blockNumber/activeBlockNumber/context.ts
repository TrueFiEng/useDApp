import { createContext, useContext } from 'react'

export const ActiveBlockNumberContext = createContext<number | undefined>(undefined)

export function useBlockNumber() {
  return useContext(ActiveBlockNumberContext)
}
