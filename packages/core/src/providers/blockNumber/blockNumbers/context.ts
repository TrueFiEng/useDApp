import { createContext, useContext } from 'react'
import { ChainId } from '../../../constants'

export const MultiBlockNumbersContext = createContext<
  {
    [chainId in ChainId]?: number
  }
>({})

export function useMultiBlockNumbers() {
  return useContext(MultiBlockNumbersContext)
}
