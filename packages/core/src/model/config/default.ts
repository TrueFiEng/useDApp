import { DEFAULT_SUPPORTED_CHAINS, FullConfig } from '../../constants'

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
  localStorageOverride: window.localStorage,
}
