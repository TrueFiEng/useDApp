import { utils, Wallet } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import { ContractJSON } from 'ethereum-waffle/dist/esm/ContractJSON'

export const MOCK_TOKEN_INITIAL_BALANCE = utils.parseEther('10')

export async function deployMockToken(deployer: Wallet, abi: ContractJSON) {
  const args = ['MOCKToken', 'MOCK', deployer.address, MOCK_TOKEN_INITIAL_BALANCE]
  return await deployContract(deployer, abi, args)
}
