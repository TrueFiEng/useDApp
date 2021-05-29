import { ContractFactory, ethers } from 'ethers'
import { ChainId } from '../constants'
import { NodeUrls } from '../model/config/Config'
import multicallABI from '../constants/abi/MultiCall.json'
import { isLocalChain } from '../helpers'

export async function deployMulticallIfLocal(chainId: ChainId, readOnlyUrls: NodeUrls | undefined): Promise<string | undefined> {
    if (isLocalChain(chainId) && readOnlyUrls !== undefined && readOnlyUrls[chainId]) {
        return await deployContract(readOnlyUrls[chainId])
    } else {
        return
    }
}

async function deployContract(url: string) {
    const provider = new ethers.providers.JsonRpcProvider(url)
    const factory = new ContractFactory(multicallABI.abi, multicallABI.bytecode, provider.getSigner())
    const contract = await factory.deploy()

    /// TODO: Ganache and Hardhat seem to be returning
    /// a success status before the contract is actually deployed
    const deployedContract = await contract.deployTransaction.wait()
    return deployedContract.contractAddress
}

