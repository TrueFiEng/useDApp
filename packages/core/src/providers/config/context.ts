import { createContext, useContext } from 'react'
import { FullConfig, Config } from '../../model/config/Config'
import { DEFAULT_CONFIG } from '../../model/config/default'

export const ConfigContext = createContext<{ config: FullConfig; setConfig: (config: Config) => void }>({
  config: DEFAULT_CONFIG,
  setConfig: () => undefined,
})

export function useConfig() {
  const { config } = useContext(ConfigContext)
  return config
}

export function useSetConfig() {
  const { setConfig } = useContext(ConfigContext)
  return setConfig
}
