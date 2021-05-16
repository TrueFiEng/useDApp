import { ChainId, CHAIN_NAMES, TEST_CHAINS } from '../constants'

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
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/address/${address}/transactions`
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
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/tx/${transactionHash}/internal-transactions`
  }
}

export function getChainName(chainId: ChainId) {
  return CHAIN_NAMES[chainId]
}

export function isTestChain(chainId: ChainId) {
  return TEST_CHAINS.includes(chainId)
}
