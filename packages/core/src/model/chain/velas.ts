import { Chain } from '../../constants'

export const Velas: Chain = {
  chainId: 106,
  chainName: 'Velas Mainnet',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x55c77eEba2b891c7f940cE4C3d9Fcd6915c12082',
  multicall2Address: '0x324f25e6eEB13D45DF559B7326d631e34Fd5ceDF',
  getExplorerAddressLink: (address: string) => `https://evmexplorer.velas.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://evmexplorer.velas.com/tx/${transactionHash}`,
}

export const VelasTestnet: Chain = {
  chainId: 111,
  chainName: 'Velas Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x649DEa474f0Ca0FDb276098d1A4c8BA62b4abC83',
  multicall2Address: '0x65f4f071505912dbC9dCCF3a51542374a43D6a5A',
  getExplorerAddressLink: (address: string) => `https://evmexplorer.testnet.velas.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://evmexplorer.testnet.velas.com/tx/${transactionHash}`,
}

export default {
  Velas,
  VelasTestnet,
}
