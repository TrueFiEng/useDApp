import { createContext, useContext } from 'react'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const BlockNumberContext = createContext<number | undefined>(undefined)

/**
 * @public
 */
export function useBlockNumber(): number | undefined {
  return useContext(BlockNumberContext)
}
