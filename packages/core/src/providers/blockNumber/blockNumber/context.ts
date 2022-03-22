import { createContext, useContext } from 'react'

export const BlockNumberContext = createContext<number | undefined>(undefined)

/**
 * @public
 */
export function useBlockNumber(): number | undefined {
  return useContext(BlockNumberContext)
}
