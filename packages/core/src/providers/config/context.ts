import { createContext, useContext } from 'react'
import { FullConfig, Config, Chain } from '../../constants'
import { DEFAULT_CONFIG } from '../../model/config/default'
import { getChainById } from '../../helpers/chain'
import { initializeConnector } from '@web3-react/core'
import { Network } from '@web3-react/network'
import { MetaMask } from '@web3-react/metamask'

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

  config.defaultConnectors = [
    initializeConnector<Network>(
      (actions) => new Network(actions, config.readOnlyUrls ?? []),
      config.networks?.map(({ chainId }) => Number(chainId))
    ),
    initializeConnector<MetaMask>((actions) => new MetaMask(actions)),
  ]

  return validConfigs(config)
}

export function useUpdateConfig() {
  const { updateConfig } = useContext(ConfigContext)
  return updateConfig
}
