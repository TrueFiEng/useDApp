import { ContractFactory, type BytesLike, type JsonRpcSigner, type TransactionReceipt, type Interface } from 'ethers'

interface ContractAbi {
  abi: Interface,
  bytecode: BytesLike
}

export async function deployContract(
  contractAbi: ContractAbi,
  signer: JsonRpcSigner
): Promise<TransactionReceipt> {
  const factory = new ContractFactory(contractAbi.abi, contractAbi.bytecode, signer)
  const contract = await factory.deploy()
  return await contract.deployTransaction.wait()
}
