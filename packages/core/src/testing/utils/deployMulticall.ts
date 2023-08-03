import { GanacheProvider } from '@ethers-ext/provider-ganache'
import { MultiCall, MultiCall2 } from '../../constants'
import { ContractFactory } from 'ethers'

export const deployMulticall = async (provider: GanacheProvider, chainId: number) => {
  return deployMulticallBase(MultiCall, provider, chainId)
}

export const deployMulticall2 = async (provider: GanacheProvider, chainId: number) => {
  return deployMulticallBase(MultiCall2, provider, chainId)
}

const deployMulticallBase = async (contract: any, provider: GanacheProvider, chainId: number) => {
  const multicallFactory = new ContractFactory(contract.abi, contract.bytecode, (await provider.listAccounts())[0])
  const multicall = await multicallFactory.deploy()
  await multicall.deploymentTransaction()?.wait()
  const multicallAddresses = { [chainId]: await multicall.getAddress() }

  return multicallAddresses
}
