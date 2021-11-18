import { ChainId } from '../../constants'
import { Mainnet, Ropsten, Rinkeby, Goerli, Kovan } from '../chain/ethereum'
import { BSC, BSCTestnet } from '../chain/bsc'
import { xDai } from '../chain/xdai'
import { Polygon, Mumbai } from '../chain/polygon'
import { FullConfig } from './Config'

export const DEFAULT_CONFIG: FullConfig = {
  pollingInterval: 15000,
  supportedChains: [
    Mainnet.chainId,
    Ropsten.chainId,
    Rinkeby.chainId,
    Goerli.chainId,
    Kovan.chainId,
    BSC.chainId,
    BSCTestnet.chainId,
    xDai.chainId,
    ChainId.Localhost,
    ChainId.Hardhat,
    Polygon.chainId,
    Mumbai.chainId,
    ChainId.Theta,
    ChainId.ThetaTestnet,
    ChainId.Harmony,
    ChainId.Moonriver,
    ChainId.Palm,
    ChainId.Fantom,
    ChainId.Avalanche,
    ChainId.Songbird,
    ChainId.MoonbaseAlpha,
  ],
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  localStorage: {
    transactionPath: 'transactions',
  },
  autoConnect: true,
}
