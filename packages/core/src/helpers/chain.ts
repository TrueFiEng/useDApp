import { ChainId, CHAIN_NAMES, LOCAL_CHAINS, TEST_CHAINS } from '../constants'
import { Mainnet, Ropsten, Rinkeby, Goerli, Kovan } from '../model/chain/ethereum'
import { BSC, BSCTestnet } from '../model/chain/bsc'
import { xDai } from '../model/chain/xdai'
import { Polygon, Mumbai } from '../model/chain/polygon'
import { Theta, ThetaTestnet } from '../model/chain/theta'
import { Moonriver } from '../model/chain/moonriver'
import { Harmony } from '../model/chain/harmony'
import { Palm } from '../model/chain/palm'
import { Fantom } from '../model/chain/Fantom'

export function getExplorerAddressLink(address: string, chainId: ChainId) {
  switch (chainId) {
    case Mainnet.chainId:
      return Mainnet.getExplorerAddressLink(address)
    case Ropsten.chainId:
      return Ropsten.getExplorerAddressLink(address)
    case Rinkeby.chainId:
      return Rinkeby.getExplorerAddressLink(address)
    case Goerli.chainId:
      return Goerli.getExplorerAddressLink(address)
    case Kovan.chainId:
      return Kovan.getExplorerAddressLink(address)
    case BSC.chainId:
      return BSC.getExplorerAddressLink(address)
    case BSCTestnet.chainId:
      return BSCTestnet.getExplorerAddressLink(address)
    case xDai.chainId:
      return xDai.getExplorerAddressLink(address)
    case Polygon.chainId:
      return Polygon.getExplorerAddressLink(address)
    case Mumbai.chainId:
      return Mumbai.getExplorerAddressLink(address)
    case Theta.chainId:
      return Theta.getExplorerAddressLink(address)
    case ThetaTestnet.chainId:
      return ThetaTestnet.getExplorerAddressLink(address)
    case Harmony.chainId:
      return Harmony.getExplorerAddressLink(address)
    case Moonriver.chainId:
      return Moonriver.getExplorerAddressLink(address)
    case Palm.chainId:
      return Palm.getExplorerAddressLink(address)
    case Fantom.chainId:
      return Fantom.getExplorerAddressLink(address)
  }
}

export function getExplorerTransactionLink(transactionHash: string, chainId: ChainId) {
  switch (chainId) {
    case Mainnet.chainId:
      return Mainnet.getExplorerTransactionLink(transactionHash)
    case Ropsten.chainId:
      return Ropsten.getExplorerTransactionLink(transactionHash)
    case Kovan.chainId:
      return Kovan.getExplorerTransactionLink(transactionHash)
    case Rinkeby.chainId:
      return Rinkeby.getExplorerTransactionLink(transactionHash)
    case Goerli.chainId:
      return Goerli.getExplorerTransactionLink(transactionHash)
    case BSC.chainId:
      return BSC.getExplorerTransactionLink(transactionHash)
    case BSCTestnet.chainId:
      return BSCTestnet.getExplorerTransactionLink(transactionHash)
    case xDai.chainId:
      return xDai.getExplorerTransactionLink(transactionHash)
    case Polygon.chainId:
      return Polygon.getExplorerTransactionLink(transactionHash)
    case Mumbai.chainId:
      return Mumbai.getExplorerTransactionLink(transactionHash)
    case Theta.chainId:
      return Theta.getExplorerTransactionLink(transactionHash)
    case ThetaTestnet.chainId:
      return ThetaTestnet.getExplorerTransactionLink(transactionHash)
    case Harmony.chainId:
      return Harmony.getExplorerTransactionLink(transactionHash)
    case Moonriver.chainId:
      return Moonriver.getExplorerTransactionLink(transactionHash)
    case Palm.chainId:
      return Palm.getExplorerTransactionLink(transactionHash)
    case Fantom.chainId:
      return Fantom.getExplorerTransactionLink(transactionHash)
  }
}

export function getChainName(chainId: ChainId) {
  return CHAIN_NAMES[chainId]
}

export function isTestChain(chainId: ChainId) {
  return TEST_CHAINS.includes(chainId)
}

export function isLocalChain(chainId: ChainId) {
  return LOCAL_CHAINS.includes(chainId)
}
