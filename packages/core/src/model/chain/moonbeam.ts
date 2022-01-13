import { Chain } from '../../constants'

export const Moonbeam: Chain = {
  chainId: 1284,
  chainName: 'Moonbeam',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x47152C4dCE75C77Bc9E52F5AAa2a20117971C365',
  getExplorerAddressLink: (address: string) =>
    `https://blockscout.moonbeam.network/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://blockscout.moonbeam.network/tx/${transactionHash}/internal-transactions`,
}

export default { Moonbeam }
