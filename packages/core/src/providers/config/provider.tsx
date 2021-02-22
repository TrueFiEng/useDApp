import { ReactNode } from 'react'
import { Config, DEFAULT_CONFIG } from '../../model/Config'
import { ConfigContext } from './context'

interface ConfigProviderProps {
  children: ReactNode
  config: Partial<Config>
}

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  return <ConfigContext.Provider value={{ ...DEFAULT_CONFIG, ...config }} children={children} />
}
