import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '../constants'

export type Web3Ethers = ReturnType<typeof useWeb3React> & { library?: Web3Provider; chainId?: ChainId }

export function useEthers(): Web3Ethers {
  return useWeb3React<Web3Provider>()
}
