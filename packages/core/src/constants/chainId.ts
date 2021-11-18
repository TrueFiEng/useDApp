import { Localhost, Hardhat } from '../model/chain/local'
import { Mainnet, Ropsten, Rinkeby, Goerli, Kovan } from '../model/chain/ethereum'
import { BSC, BSCTestnet } from '../model/chain/bsc'
import { xDai } from '../model/chain/xdai'
import { Polygon, Mumbai } from '../model/chain/polygon'
import { Theta, ThetaTestnet } from '../model/chain/theta'
import { Moonriver } from '../model/chain/moonriver'
import { Harmony } from '../model/chain/harmony'
import { Palm } from '../model/chain/palm'
import { Fantom } from '../model/chain/Fantom'
import { Avalanche } from '../model/chain/avalanche'

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  BSC = 56,
  BSCTestnet = 97,
  xDai = 100,
  Polygon = 137,
  Theta = 361,
  ThetaTestnet = 365,
  Moonriver = 1285,
  Mumbai = 80001,
  Harmony = 1666600000,
  Palm = 11297108109,
  Localhost = 1337,
  Hardhat = 31337,
  Fantom = 250,
  Avalanche = 43114,
  Songbird = 19,
  MoonbaseAlpha = 1287,
}

export const CHAIN_NAMES = {
  [Mainnet.chainId]: Mainnet.chainName,
  [Ropsten.chainId]: Ropsten.chainName,
  [Rinkeby.chainId]: Rinkeby.chainName,
  [Goerli.chainId]: Goerli.chainName,
  [Kovan.chainId]: Kovan.chainName,
  [BSC.chainId]: BSC.chainName,
  [BSCTestnet.chainId]: BSCTestnet.chainName,
  [xDai.chainId]: xDai.chainName,
  [Polygon.chainId]: Polygon.chainName,
  [Theta.chainId]: Theta.chainName,
  [ThetaTestnet.chainId]: ThetaTestnet.chainName,
  [Moonriver.chainId]: Moonriver.chainName,
  [Mumbai.chainId]: Mumbai.chainName,
  [Harmony.chainId]: Harmony.chainName,
  [Palm.chainId]: Palm.chainName,
  [Localhost.chainId]: Localhost.chainName,
  [Hardhat.chainId]: Hardhat.chainName,
  [Fantom.chainId]: Fantom.chainName,
}

export const MULTICALL_ADDRESSES = {
  [Mainnet.chainId]: Mainnet.MULTICALL_ADDRESS,
  [Ropsten.chainId]: Ropsten.MULTICALL_ADDRESS,
  [Rinkeby.chainId]: Rinkeby.MULTICALL_ADDRESS,
  [Goerli.chainId]: Goerli.MULTICALL_ADDRESS,
  [Kovan.chainId]: Kovan.MULTICALL_ADDRESS,
  [BSC.chainId]: BSC.MULTICALL_ADDRESS,
  [BSCTestnet.chainId]: BSCTestnet.MULTICALL_ADDRESS,
  [xDai.chainId]: xDai.MULTICALL_ADDRESS,
  [Polygon.chainId]: Polygon.MULTICALL_ADDRESS,
  [Theta.chainId]: ThetaTestnet.MULTICALL_ADDRESS,
  [ThetaTestnet.chainId]: ThetaTestnet.MULTICALL_ADDRESS,
  [Moonriver.chainId]: Moonriver.MULTICALL_ADDRESS,
  [Mumbai.chainId]: Mumbai.MULTICALL_ADDRESS,
  [Harmony.chainId]: Harmony.MULTICALL_ADDRESS,
  [Palm.chainId]: Palm.MULTICALL_ADDRESS,
  [Fantom.chainId]: Fantom.MULTICALL_ADDRESS,
}

export const TEST_CHAINS = [
  Ropsten.chainId,
  Rinkeby.chainId,
  Goerli.chainId,
  Kovan.chainId,
  BSCTestnet.chainId,
  Mumbai.chainId,
  ThetaTestnet.chainId,
  Localhost.chainId,
  Hardhat.chainId,
]

export const LOCAL_CHAINS = [Localhost.chainId, Hardhat.chainId]
