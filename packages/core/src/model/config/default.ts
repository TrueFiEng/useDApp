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
    ChainId.BSCTestnet,
    ChainId.xDai,
    ChainId.Localhost,
    ChainId.Hardhat,
    ChainId.Polygon,
    ChainId.Mumbai,
    ChainId.Theta,
    ChainId.ThetaTestnet,
    ChainId.Harmony,
    ChainId.Moonriver,
    ChainId.Palm,
    ChainId.Fantom,
  ],
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  localStorage: {
    transactionPath: 'transactions',
  },
}
