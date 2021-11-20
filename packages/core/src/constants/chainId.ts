import { Localhost, Hardhat } from '../model/chain/local'
// organize imports in alphabet order to sparse the conflict when adding a new chain
import { Avalanche } from '../model/chain/avalanche'
import { BSC, BSCTestnet } from '../model/chain/bsc'
import { Fantom } from '../model/chain/fantom'
import { Harmony } from '../model/chain/harmony'
import { Mainnet, Ropsten, Rinkeby, Goerli, Kovan } from '../model/chain/ethereum'
import { Moonriver, MoonbaseAlpha } from '../model/chain/moonriver'
import { Palm } from '../model/chain/palm'
import { Polygon, Mumbai } from '../model/chain/polygon'
import { Songbird } from '../model/chain/songbird'
import { Theta, ThetaTestnet } from '../model/chain/theta'
import { xDai } from '../model/chain/xdai'

// rough alphabet order (put network from the same chain together)
export const DEFAULT_SUPPORTED_CHAINS = [
  Localhost,
  Hardhat,
  Avalanche,
  Mainnet,
  Ropsten,
  Rinkeby,
  Goerli,
  Kovan,
  BSC,
  BSCTestnet,
  Fantom,
  Harmony,
  Moonriver,
  MoonbaseAlpha,
  Palm,
  Polygon,
  Mumbai,
  Songbird,
  Theta,
  ThetaTestnet,
  xDai,
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
