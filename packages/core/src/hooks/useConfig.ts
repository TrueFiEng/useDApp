import { useContext } from 'react'
import { Chain, FullConfig } from '../constants'
import { getChainById } from '../helpers'
import { ConfigContext } from '../providers'

const validConfigs = (configs: FullConfig): FullConfig | Record<string, never> => {
  if (!configs?.networks || configs?.networks.length === 0) {
    console.warn('No networks or supportedChain configured')
  }
  return configs
}

/**
 * Returns singleton instance of {@link Config}.
 * Takes no parameters.
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
