import { deployContract, MockProvider } from 'ethereum-waffle'
import { MultiCall } from '@usedapp/core'
import { AbstractConnector } from '@web3-react/abstract-connector'

export const deployMulticall = async (provider: MockProvider, connector: AbstractConnector) => {
  const multicall = await deployContract((await provider.getWallets())[0], {
    bytecode: MultiCall.bytecode,
    abi: MultiCall.abi,
  })
  const multicallAddresses = { [await connector.getChainId()]: multicall.address }

  return multicallAddresses
}
