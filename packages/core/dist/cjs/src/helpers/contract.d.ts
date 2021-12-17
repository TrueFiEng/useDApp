import { ethers } from 'ethers';
interface ContractAbi {
    abi: ethers.ContractInterface;
    bytecode: ethers.utils.BytesLike;
}
export declare function deployContract(contractAbi: ContractAbi, signer: ethers.providers.JsonRpcSigner): Promise<ethers.providers.TransactionReceipt>;
export {};
//# sourceMappingURL=contract.d.ts.map