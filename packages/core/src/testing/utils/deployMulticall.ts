import { deployContract, MockProvider } from 'ethereum-waffle'
import { MultiCall } from '@usedapp/core'

export const deployMulticall = async (provider: MockProvider, chainId: number) => {
  const multicall = await deployContract((await provider.getWallets())[0], {
    bytecode: MultiCall.bytecode,
    abi: MultiCall.abi,
  })
  const multicallAddresses = { [chainId]: multicall.address }

  return multicallAddresses
}
