import { ChainId, ConnectorTuple } from '../constants'
import { useConfig, useConnectors } from '../providers'
import { MetaMask } from '@web3-react/metamask'
import { useCallback } from 'react'

function findActiveConnector(connectors: ConnectorTuple[]) {
  return connectors.find(([, , store]) => !!store.getState().accounts)
}

export function useEthers() {
  const { activeConnector, setConnectors, connectors, setActiveConnector } = useConnectors()
  const {defaultConnectors} = useConfig()
  const [connector, hooks, store] = activeConnector ?? findActiveConnector(connectors) ?? connectors[0]
  const result = hooks.useWeb3React(hooks.useProvider())

  const deactivate = useCallback(() => {
    setConnectors(defaultConnectors)
    setActiveConnector(undefined)
    return connector.deactivate?.()
  }, [connector, defaultConnectors])

  const activate = useCallback(() => {
    setActiveConnector([connector, hooks, store])
    return connector.activate()
  }, [connector, hooks, store])

  const activateBrowserWallet = useCallback(() => {
    const metamask = connectors.find(([connector]) => connector instanceof MetaMask)
    if (metamask) {
      setActiveConnector(metamask)
      return metamask[0].activate()
    } else {
      setActiveConnector([connector, hooks, store])
      return connector.activate()
    }
  }, [connectors])

  return { ...result, chainId: result.chainId as ChainId, activate, deactivate, activateBrowserWallet }
}
