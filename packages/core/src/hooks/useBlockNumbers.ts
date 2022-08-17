import { useContext } from 'react'
import { BlockNumbersContext } from '../providers'

/**
 * Get the current block numbers of all observed chains.
 * Will update automatically when new blocks are mined.
 * @internal Intended for internal use - use it on your own risk
 */
export function useBlockNumbers() {
  return useContext(BlockNumbersContext)
}
