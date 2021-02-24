import { createContext, useContext } from 'react'
import { FullConfig } from '../../model/config/Config'
import { DEFAULT_CONFIG } from '../../model/config/default'

export const ConfigContext = createContext<FullConfig>(DEFAULT_CONFIG)

export function useConfig() {
  return useContext(ConfigContext)
}
