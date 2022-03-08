import { utils, Wallet } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import { ERC20Mock } from '../../constants'

export const MOCK_TOKEN_INITIAL_BALANCE = utils.parseEther('10')

export async function deployMockToken(deployer: Wallet) {
  const args = ['MOCKToken', 'MOCK', deployer.address, MOCK_TOKEN_INITIAL_BALANCE]
  return await deployContract(deployer, ERC20Mock, args)
}
