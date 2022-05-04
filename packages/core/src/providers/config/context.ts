import { createContext } from 'react'
import { FullConfig, Config } from '../../constants'
import { DEFAULT_CONFIG } from '../../model/config/default'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const ConfigContext = createContext<{ config: FullConfig; updateConfig: (config: Config) => void }>({
  config: DEFAULT_CONFIG,
  updateConfig: () => undefined,
})
