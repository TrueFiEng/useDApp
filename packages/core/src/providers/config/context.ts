import { createContext, useContext } from 'react'
import { FullConfig, Config, Chain } from '../../constants'
import { DEFAULT_CONFIG } from '../../model/config/default'
import { getChainById } from '../../helpers/chain'

export const ConfigContext = createContext<{ config: FullConfig; updateConfig: (config: Config) => void }>({
  config: DEFAULT_CONFIG,
  updateConfig: () => undefined,
})

const validConfigs = (configs: FullConfig): FullConfig | Record<string, never> => {
  if (!configs?.networks || configs?.networks.length === 0) {
    console.warn('No networks or supportedChain configured')
  }
  return configs
}

/**
 * @public
 */
export function useConfig() {
  const { config } = useContext(ConfigContext)

  // backward compatible with supportedChains
  if (config.supportedChains) {
    console.warn('supportedChain is deprecated, please pass networks instead')
    const networks: Chain[] = config.supportedChains?.map((chainId) => getChainById(chainId)) as Chain[]
    return validConfigs({
      ...config,
      networks,
    })
  }

  return validConfigs(config)
}

/**
 * @public
 */
export function useUpdateConfig() {
  const { updateConfig } = useContext(ConfigContext)
  return updateConfig
}
