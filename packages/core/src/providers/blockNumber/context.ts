import { createContext, useContext } from 'react'
import { useDAppService } from '..'

export const BlockNumberContext = createContext<number | undefined>(undefined)

export function useBlockNumber() {
  return useContext(BlockNumberContext)
}

export function useBlockNumber2() {
  const dAppService = useDAppService()
  return dAppService?.blockNumber
}
