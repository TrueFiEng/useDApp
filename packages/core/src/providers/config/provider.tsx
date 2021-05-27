import { ReactNode, useReducer } from 'react'
import { Config } from '../../model/config/Config'
import { DEFAULT_CONFIG } from '../../model/config/default'
import { ConfigContext } from './context'
import { configReducer } from './reducer'

interface ConfigProviderProps {
  children: ReactNode
  config: Config
}

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  const [reducedConfig, dispatch] = useReducer(configReducer, { ...DEFAULT_CONFIG, ...config })
  return <ConfigContext.Provider value={{ config: reducedConfig, updateConfig: dispatch }} children={children} />
}
