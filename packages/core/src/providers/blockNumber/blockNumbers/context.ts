import { createContext, useContext } from 'react'
import { ChainId } from '../../../constants'

/**
 * Tracks the current block numbers for the read-only providers.
 */
export const BlockNumbersContext = createContext<
  {
    [chainId in ChainId]?: number
  }
>({})

export function useBlockNumbers() {
  return useContext(BlockNumbersContext)
}
