import { ChainId } from '../../constants'
import { FullConfig } from './Config'

export const DEFAULT_CONFIG: FullConfig = {
  pollingInterval: 15000,
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Goerli,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.BSC,
    ChainId.xDai,
    ChainId.Polygon,
    ChainId.Mumbai,
  ],
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
}
