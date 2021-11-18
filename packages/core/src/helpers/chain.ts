import { ChainId, CHAIN_NAMES, LOCAL_CHAINS, TEST_CHAINS } from '../constants'
import { Mainnet, Ropsten, Rinkeby, Goerli, Kovan } from '../model/chain/ethereum'
import { BSC, BSCTestnet } from '../model/chain/bsc'
import { xDai } from '../model/chain/xdai'
import { Polygon, Mumbai } from '../model/chain/polygon'

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
    case ChainId.Theta:
      return `https://explorer.thetatoken.org/address/${address}`
    case ChainId.ThetaTestnet:
      return `https://testnet-explorer.thetatoken.org/address/${address}`
    case ChainId.Harmony:
      return `https://explorer.harmony.one/address/${address}`
    case ChainId.Moonriver:
      return `https://blockscout.moonriver.moonbeam.network/address/${address}/transactions`
    case ChainId.Palm:
      return `https://explorer.palm.io/address/${address}`
    case ChainId.Fantom:
      return `https://ftmscan.com/address/${address}`
    case ChainId.Avalanche:
      return `https://snowtrace.io/address/${address}`
    case ChainId.Songbird:
      return `https://songbird-explorer.flare.network/address/${address}`
    case ChainId.MoonbaseAlpha:
      return `https://moonbase.moonscan.io/address/${address}`
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
    case ChainId.Theta:
      return `https://explorer.thetatoken.org/tx/${transactionHash}`
    case ChainId.ThetaTestnet:
      return `https://testnet-explorer.thetatoken.org/tx/${transactionHash}`
    case ChainId.Harmony:
      return `https://explorer.harmony.one/tx/${transactionHash}`
    case ChainId.Moonriver:
      return `https://blockscout.moonriver.moonbeam.network/tx/${transactionHash}/internal-transactions`
    case ChainId.Palm:
      return `https://explorer.palm.io/tx/${transactionHash}`
    case ChainId.Fantom:
      return `https://ftmscan.com/tx/${transactionHash}`
    case ChainId.Avalanche:
      return `https://snowtrace.io/tx/${transactionHash}`
    case ChainId.Songbird:
      return `https://songbird-explorer.flare.network/tx/${transactionHash}`
    case ChainId.MoonbaseAlpha:
      return `https://moonbase.moonscan.io/tx/${transactionHash}`
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
