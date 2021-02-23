import { createContext, useContext } from 'react'
import { Config } from '../../model/config/Config'
import { DEFAULT_CONFIG } from '../../model/config/default'

export const ConfigContext = createContext<Config>(DEFAULT_CONFIG)

export function useConfig() {
  return useContext(ConfigContext)
}
