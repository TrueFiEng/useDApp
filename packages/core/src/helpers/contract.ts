import { ContractFactory, ethers } from 'ethers'

interface ContractAbi {
  abi: ethers.ContractInterface
  bytecode: ethers.utils.BytesLike
}

interface ContractDeployment {
  contractAddress: string
  receipt: ethers.providers.TransactionReceipt
}

export async function deployContract(
  contractAbi: ContractAbi,
  signer: ethers.providers.JsonRpcSigner
): Promise<ContractDeployment> {
  const factory = new ContractFactory(contractAbi.abi, contractAbi.bytecode, signer)
  const contract = await factory.deploy()
  const deployedContract = await contract.deployTransaction.wait()
  return {
    contractAddress: deployedContract.contractAddress,
    receipt: deployedContract,
  }
}
