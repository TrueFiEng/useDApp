import { ReactNode, useReducer } from 'react'
import merge from 'lodash.merge'
import { Config } from '../../constants'
import { DEFAULT_CONFIG } from '../../model/config/default'
import { ConfigContext } from './context'
import { configReducer } from './reducer'

interface ConfigProviderProps {
  children: ReactNode
  config: Config
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function ConfigProvider({ config, children }: ConfigProviderProps) {
  const [reducedConfig, dispatch] = useReducer(configReducer, merge({}, DEFAULT_CONFIG, config))
  return <ConfigContext.Provider value={{ config: reducedConfig, updateConfig: dispatch }} children={children} />
}
