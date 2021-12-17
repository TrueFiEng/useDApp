import { ContractFactory } from 'ethers';
export async function deployContract(contractAbi, signer) {
    const factory = new ContractFactory(contractAbi.abi, contractAbi.bytecode, signer);
    const contract = await factory.deploy();
    return await contract.deployTransaction.wait();
}
//# sourceMappingURL=contract.js.map