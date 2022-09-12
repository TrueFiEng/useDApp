import { DEFAULT_SUPPORTED_CHAINS, FullConfig } from '../../constants'
import { MetamaskConnector } from '../../providers/network/connectors/implementations'

export const DEFAULT_CONFIG: FullConfig = {
  pollingInterval: 15000,
  supportedChains: undefined,
  networks: DEFAULT_SUPPORTED_CHAINS,
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  localStorage: {
    transactionPath: 'transactions',
  },
  autoConnect: true,
  multicallVersion: 1,
  connectors: {
    metamask: new MetamaskConnector(),
  },
}
