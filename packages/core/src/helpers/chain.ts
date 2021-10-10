import { ChainId, CHAIN_NAMES, LOCAL_CHAINS, TEST_CHAINS } from '../constants'

function etherscanNetworkPrefix(chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
      return ``
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
      return getChainName(chainId).toLocaleLowerCase() + '.'
  }
}

export function getExplorerAddressLink(address: string, chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
      return `https://${etherscanNetworkPrefix(chainId)}etherscan.io/address/${address}`
    case ChainId.BSC:
      return `https://bscscan.com/address/${address}`
    case ChainId.BSCTestnet:
      return `https://testnet.bscscan.com/address/${address}`
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/address/${address}/transactions`
    case ChainId.Polygon:
      return `https://explorer-mainnet.maticvigil.com/address/${address}/transactions`
    case ChainId.Mumbai:
      return `https://explorer-mumbai.maticvigil.com/address/${address}/transactions`
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
  }
}

export function getExplorerTransactionLink(transactionHash: string, chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
      return `https://${etherscanNetworkPrefix(chainId)}etherscan.io/tx/${transactionHash}`
    case ChainId.BSC:
      return `https://bscscan.com/tx/${transactionHash}`
    case ChainId.BSCTestnet:
      return `https://testnet.bscscan.com/tx/${transactionHash}`
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/tx/${transactionHash}/internal-transactions`
    case ChainId.Polygon:
      return `https://explorer-mainnet.maticvigil.com/tx/${transactionHash}/internal-transactions`
    case ChainId.Mumbai:
      return `https://explorer-mumbai.maticvigil.com/tx/${transactionHash}/internal-transactions`
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
