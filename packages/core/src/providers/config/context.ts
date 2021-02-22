import { createContext, useContext } from 'react'
import { Config, DEFAULT_CONFIG } from '../../model/Config'

export const ConfigContext = createContext<Config>(DEFAULT_CONFIG)

export function useConfig() {
  return useContext(ConfigContext)
}
