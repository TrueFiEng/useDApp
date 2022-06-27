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
  localStorageFunctions: {
    getItem: (key: string) => {
      if (typeof window === 'undefined') {
        return null
      }
    
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        try {
          return JSON.parse(item)
        } catch {
          // ignore error
        }
      }
    },
    setItem: (key: string, value: any) => {
      if (value === undefined) {
        window.localStorage.removeItem(key)
      } else {
        const toStore = JSON.stringify(value)
        window.localStorage.setItem(key, toStore)
        return JSON.parse(toStore)
      }
    }
  }
}
