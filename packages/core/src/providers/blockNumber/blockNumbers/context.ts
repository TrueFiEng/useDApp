import { createContext, useContext } from 'react'
import { ChainId } from '../../../constants'

export const BlockNumbersContext = createContext<
  {
    [chainId in ChainId]?: number
  }
>({})

export function useBlockNumbers() {
  return useContext(BlockNumbersContext)
}
