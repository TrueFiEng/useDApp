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

export const SUPPORT_NETWORKS = [
  Localhost,
  Hardhat,
  Mainnet,
  Ropsten,
  Rinkeby,
  Goerli,
  Kovan,
  BSC,
  BSCTestnet,
  xDai,
  Polygon,
  Mumbai,
  Theta,
  ThetaTestnet,
  Moonriver,
  Harmony,
  Palm,
  Fantom,
]

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

export const MULTICALL_ADDRESSES: { [index: number]: string } = {}
SUPPORT_NETWORKS
  .filter(network => network.MULTICALL_ADDRESS)
  .map((network) => MULTICALL_ADDRESSES[network.chainId] = network.MULTICALL_ADDRESS)

export const LOCAL_CHAINS = [Localhost.chainId, Hardhat.chainId]
