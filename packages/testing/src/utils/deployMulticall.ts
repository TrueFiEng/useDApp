import { deployContract, MockProvider } from 'ethereum-waffle'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ContractJSON } from 'ethereum-waffle/dist/esm/ContractJSON'

export const deployMulticall = async (provider: MockProvider, connector: AbstractConnector, contract: ContractJSON) => {
  const multicall = await deployContract((await provider.getWallets())[0], contract)

  const multicallAddresses = { [await connector.getChainId()]: multicall.address }

  return multicallAddresses
}
