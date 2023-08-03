import { Contract, ContractFactory, Wallet, parseEther } from 'ethers'
import { ERC20Mock } from '../../constants'

export const MOCK_TOKEN_INITIAL_BALANCE = parseEther('10')
export const SECOND_TEST_CHAIN_ID = 31337
export const SECOND_MOCK_TOKEN_INITIAL_BALANCE = BigInt(2000)

export async function deployMockToken(deployer: Wallet, initialBalance?: BigInt) {
  const args = ['MOCKToken', 'MOCK', deployer.address, initialBalance ?? MOCK_TOKEN_INITIAL_BALANCE]
  const contractFactory = new ContractFactory(ERC20Mock.abi, ERC20Mock.bytecode, deployer)
  const contract = await contractFactory.deploy(...args)
  await contract.deploymentTransaction()?.wait();
  return contract as any as Contract;
}
