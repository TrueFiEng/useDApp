import { Localhost, Hardhat } from '../chain/local'
import { Mainnet, Ropsten, Rinkeby, Goerli, Kovan } from '../chain/ethereum'
import { BSC, BSCTestnet } from '../chain/bsc'
import { xDai } from '../chain/xdai'
import { Polygon, Mumbai } from '../chain/polygon'
import { Theta, ThetaTestnet } from '../chain/theta'
import { Moonriver } from '../chain/moonriver'
import { Harmony } from '../chain/harmony'
import { Palm } from '../chain/palm'
import { Fantom } from '../chain/fantom'
import { Avalanche } from '../chain/avalanche'

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
    Localhost.chainId,
    Hardhat.chainId,
    Polygon.chainId,
    Mumbai.chainId,
    Theta.chainId,
    ThetaTestnet.chainId,
    Harmony.chainId,
    Palm.chainId,
    Moonriver.chainId,
    Fantom.chainId,
    Avalanche.chainId,
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
