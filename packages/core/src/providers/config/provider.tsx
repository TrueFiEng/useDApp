import { ReactNode, useReducer } from 'react'
import pickBy from 'lodash.pickby'
import { Config, FullConfig } from '../../constants'
import { DEFAULT_CONFIG } from '../../model/config/default'
import { ConfigContext } from './context'
import { configReducer } from './reducer'

interface ConfigProviderProps {
  children: ReactNode
  config: Config
}

/**
 * We strip supplied config of undefined fields because it can easily break TS assumptions.
 *
 * Illustrative example:
 *
 * type FullConf = { something: string }
 * type PartConf = Partial<FullConf>
 *
 * const defaultConf: FullConf = { something: 'default' }
 * const suppliedConf: PartConf = { something: undefined }
 * const conf: FullConf = {...defaultConf, ...suppliedConf}
 * conf.something.toString() // OK according to TS, breaks on runtime.
 */

/**
 * @internal Intended for internal use - use it on your own risk
 */
const noUndefined = (x: any) => x !== undefined
export function ConfigProvider({ config, children }: ConfigProviderProps) {
  const configWithDefaults: FullConfig = {
    ...DEFAULT_CONFIG,
    ...pickBy(config, noUndefined),
    bufferGasLimitPercentage: undefined,
    gasLimitBufferPercentage: config.gasLimitBufferPercentage ?? config.bufferGasLimitPercentage,
    notifications: {
      ...DEFAULT_CONFIG.notifications,
      ...pickBy(config.notifications, noUndefined),
    },
  }
  const [reducedConfig, dispatch] = useReducer(configReducer, configWithDefaults)
  return <ConfigContext.Provider value={{ config: reducedConfig, updateConfig: dispatch }} children={children} />
}
