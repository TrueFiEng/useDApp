import { DEFAULT_SUPPORTED_CHAINS, FullConfig } from '../../constants'

export const DEFAULT_CONFIG: FullConfig = {
  pollingInterval: 15000,
  supportedChains: DEFAULT_SUPPORTED_CHAINS.map((network) => network.chainId),
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  localStorage: {
    transactionPath: 'transactions',
  },
  autoConnect: true,
}
