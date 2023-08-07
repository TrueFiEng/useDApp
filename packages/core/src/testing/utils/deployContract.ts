import { Contract, ContractFactory, Signer } from 'ethers'

export interface ContractDeclaration {
  abi: any
  bytecode: string
}

export const deployContract = async (deployer: Signer, { abi, bytecode }: ContractDeclaration, args: any[] = []) => {
  const contractFactory = new ContractFactory(abi, bytecode, deployer)
  const contract = await contractFactory.deploy(...args) as any as Contract
  await contract.deploymentTransaction()?.wait()
  return contract
}
