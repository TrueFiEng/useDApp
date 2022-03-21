import { createContext, useContext } from 'react'

/**
 * Tracks the current block number for the writable provider (usually MetaMask).
 */
export const BlockNumberContext = createContext<number | undefined>(undefined)

/**
 * @public
 */
export function useBlockNumber(): number | undefined {
  return useContext(BlockNumberContext)
}
