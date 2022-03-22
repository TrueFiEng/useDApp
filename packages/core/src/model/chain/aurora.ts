import { Chain } from '../../constants'

export const Aurora: Chain = {
  chainId: 1313161554,
  chainName: 'Aurora',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x32b50c286DEFd2932a0247b8bb940b78c063F16c',
  multicall2Address: '0xace58a26b8Db90498eF0330fDC9C2655db0C45E2',
  getExplorerAddressLink: (address) => `https://explorer.mainnet.aurora.dev/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://explorer.mainnet.aurora.dev/tx/${transactionHash}`,
}

export const AuroraTestnet: Chain = {
  chainId: 1313161555,
  chainName: 'Aurora Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x755E730F28A31079711aB588e3568e70A40F3564',
  getExplorerAddressLink: (address) => `https://explorer.testnet.aurora.dev/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://explorer.testnet.aurora.dev/tx/${transactionHash}`,
}

export default {
  Aurora,
  AuroraTestnet,
}
