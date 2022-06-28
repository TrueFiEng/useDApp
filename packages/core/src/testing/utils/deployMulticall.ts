import { deployContract, MockProvider } from 'ethereum-waffle'
import { MultiCall, MultiCall2 } from '../../constants'

export const deployMulticall = async (provider: MockProvider, chainId: number) => {
  return deployMulticallBase(MultiCall, provider, chainId)
}

export const deployMulticall2 = async (provider: MockProvider, chainId: number) => {
  return deployMulticallBase(MultiCall2, provider, chainId)
}

const deployMulticallBase = async (contract: any, provider: MockProvider, chainId: number) => {
  const multicall = await deployContract((await provider.getWallets())[0], {
    bytecode: contract.bytecode,
    abi: contract.abi,
  })
  const multicallAddresses = { [chainId]: multicall.address }

  return multicallAddresses
}
