import { Chain } from '../../constants/Chain'

export const Fantom: Chain = {
  chainId: 250,
  chainName: 'Fantom',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xdc85396592f0F466224390771C861EE3957a3ff4',
  getExplorerAddressLink: (address: string) => `https://ftmscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://ftmscan.com/tx/${transactionHash}`,
}

export const FantomTestnet: Chain = {
  chainId: 4002,
  chainName: 'FantomTestnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xdc85396592f0F466224390771C861EE3957a3ff4', // ?? TODO:
  getExplorerAddressLink: (address: string) => `https://testnet.ftmscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://testnet.ftmscan.com/tx/${transactionHash}`,
}


export default { Fantom, FantomTestnet }
