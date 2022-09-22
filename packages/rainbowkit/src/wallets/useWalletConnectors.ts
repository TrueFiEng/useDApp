import { useEthers, Connector, ConnectorController, useConfig } from '@usedapp/core'
import { flatten } from '../utils/flatten'
import { indexBy } from '../utils/indexBy'
import { isNotNullish } from '../utils/isNotNullish'
import { useInitialChainId, useRainbowKitChains } from './../components/RainbowKitProvider/RainbowKitChainContext'
import { WalletInstance } from './Wallet'
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds'

export interface WalletConnector extends WalletInstance {
  ready?: boolean
  connect?: ReturnType<typeof useEthers>['activateBrowserWallet']
  onConnecting?: (fn: () => void) => void
  showWalletConnectModal?: () => void
  recent: boolean
}

export function useWalletConnectors(): WalletConnector[] {
  const rainbowKitChains = useRainbowKitChains()
  const intialChainId = useInitialChainId()
  const { activateBrowserWallet } = useEthers()
  const { connectors } = useConfig()
  const defaultConnectors = Object.values(connectors) as Connector[]

  async function connectWallet(walletId: string, connector: Connector) {
    const name = connector.name
    void activateBrowserWallet({ type: name.charAt(0).toLowerCase() + name.slice(1) })
  }

  const walletInstances = flatten(
    defaultConnectors.map((connector) => {
      // @ts-expect-error
      return (connector._wallets as WalletInstance[]) ?? []
    })
  ).sort((a, b) => a.index - b.index)

  const walletInstanceById = indexBy(walletInstances, (walletInstance) => walletInstance.id)

  const MAX_RECENT_WALLETS = 3
  const recentWallets: WalletInstance[] = getRecentWalletIds()
    .map((walletId) => walletInstanceById[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS)

  const groupedWallets: WalletInstance[] = [
    ...recentWallets,
    ...walletInstances.filter((walletInstance) => !recentWallets.includes(walletInstance)),
  ]

  const walletConnectors: WalletConnector[] = []

  groupedWallets.forEach((wallet: WalletInstance) => {
    if (!wallet) {
      return
    }

    const recent = recentWallets.includes(wallet)

    walletConnectors.push({
      ...wallet,
      connect: () => connectWallet(wallet.id, wallet.connector),
      groupName: recent ? 'Recent' : wallet.groupName,
      onConnecting: (fn: () => void) =>
        wallet.connector.update.on('message', ({ type }) => (type === 'connecting' ? fn() : undefined)),
      ready: (wallet.installed ?? true) && wallet.connector,
      recent,
      showWalletConnectModal: wallet.walletConnectModalConnector
        ? async () => {
            try {
              await connectWallet(wallet.id, wallet.walletConnectModalConnector!)
            } catch (err) {
              // @ts-expect-error
              const isUserRejection = err.name === 'UserRejectedRequestError'

              if (!isUserRejection) {
                throw err
              }
            }
          }
        : undefined,
    })
  })

  return walletConnectors
}
