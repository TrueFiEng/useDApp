import { ChainId } from '../constants'
import { useConnectors } from '../providers'

export function useEthers() {
  const {connectors} = useConnectors()
  const [activeConnector, hooks] = connectors[0]
  const result = hooks.useWeb3React(hooks.useProvider())
  const ensName = hooks.useENSName(result.library)
  const deactivate = () => activeConnector.deactivate?.()
  const activate = () => activeConnector.activate()
  // Backwards compatibility
  const activateBrowserWallet = () => activate()

  return { ...result, chainId: result.chainId as ChainId, ensName, activate, deactivate, activateBrowserWallet }
}
