import { Chain } from '../../constants'

export const Stardust: Chain = {
  chainId: 588,
  chainName: 'Stardust',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xaF9D4DC0698d8FD9f41387ecb08D9976079B8086',
  getExplorerAddressLink: (address: string) => `https://stardust-explorer.metis.io/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://stardust-explorer.metis.io/${transactionHash}`,
}

export default { Stardust }
