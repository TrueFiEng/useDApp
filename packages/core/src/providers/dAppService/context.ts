import { createContext, useContext } from 'react'
import { DAppService } from './dAppService'

export const dAppServiceContext = createContext<DAppService | undefined>(undefined)

export function useDAppService() {
  return useContext(dAppServiceContext)
}
