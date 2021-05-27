import { ethers } from 'ethers'
import { ChainId } from '../constants'
import { NodeUrls } from '../model/config/Config'
import multicallABI from '../constants/abi/MultiCall.json'
import { isLocalChain } from '../helpers'

interface ContractDeployment {
    contractAddress: string
}

export async function deployLocalMulticall(chainId: ChainId, readOnlyUrls: NodeUrls | undefined): Promise<ContractDeployment | undefined> {
    if (isLocalChain(chainId) && readOnlyUrls !== undefined && readOnlyUrls[chainId]) {
        return deployMulticall(readOnlyUrls[chainId])
    } else {
        return
    }
}

export async function deployMulticall(url: string): Promise<ContractDeployment> {
    const provider = new ethers.providers.JsonRpcProvider(url)
    const accounts = await provider.listAccounts()
    const account = accounts[0]

    const txData = [{
        "from": account,
        "gas": "0x64b94",
        "data": `0x${multicallABI.bytecode}`
    }]

    const transactionHash = await provider.send('eth_sendTransaction', txData)
    const txResult = await provider.send('eth_getTransactionReceipt', [transactionHash])
    return txResult
}
