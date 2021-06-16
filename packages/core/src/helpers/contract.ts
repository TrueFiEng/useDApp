import { ContractFactory, ethers } from 'ethers'

interface ContractAbi {
  abi: ethers.ContractInterface
  bytecode: ethers.utils.BytesLike
}

export async function deployContract(
  contractAbi: ContractAbi,
  signer: ethers.providers.JsonRpcSigner
): Promise<ethers.providers.TransactionReceipt> {
  const factory = new ContractFactory(contractAbi.abi, contractAbi.bytecode, signer)
  const contract = await factory.deploy()
  return await contract.deployTransaction.wait()
}
