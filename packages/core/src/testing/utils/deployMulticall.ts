import { MultiCall, MultiCall2 } from '../../constants'
import { deployContract } from './deployContract'
import { Signer } from 'ethers'

export const deployMulticall = async (chainId: number, deployer: Signer) => {
  return deployMulticallBase(MultiCall, chainId, deployer)
}

export const deployMulticall2 = async (chainId: number, deployer: Signer) => {
  return deployMulticallBase(MultiCall2, chainId, deployer)
}

const deployMulticallBase = async (contract: any, chainId: number, deployer: Signer) => {
  const multicall = await deployContract(deployer, {
    bytecode: contract.bytecode,
    abi: contract.abi,
  })
  const multicallAddresses = { [chainId]: multicall.address }

  return multicallAddresses
}
