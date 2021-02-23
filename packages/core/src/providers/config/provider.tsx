import { ReactNode } from 'react'
import { Config } from '../../model/config/Config'
import { DEFAULT_CONFIG } from '../../model/config/default'
import { ConfigContext } from './context'

interface ConfigProviderProps {
  children: ReactNode
  config: Partial<Config>
}

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  return <ConfigContext.Provider value={{ ...DEFAULT_CONFIG, ...config }} children={children} />
}
