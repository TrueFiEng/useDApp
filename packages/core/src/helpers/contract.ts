import { BytesLike, Contract, ContractFactory, JsonRpcSigner, TransactionReceipt, ethers } from 'ethers'

interface ContractAbi {
  abi: ethers.Interface | ethers.InterfaceAbi
  bytecode: BytesLike
}

export async function deployContract(
  contractAbi: ContractAbi,
  signer: JsonRpcSigner
): Promise<TransactionReceipt> {
  const factory = new ContractFactory(contractAbi.abi, contractAbi.bytecode, signer)
  const contract = await factory.deploy() as Contract
  const txReceipt = await contract.deploymentTransaction()?.wait()
  if (!txReceipt) throw new Error('Contract deployment failed')
  return txReceipt
}
