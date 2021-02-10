import { MULTICALL_ABI } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainCall } from '../providers'
import { useMulticallAddress, useChainCalls } from '.'

export function useBlockMeta() {
  const address = useMulticallAddress()

  const calls: ChainCall[] = [
    { address, data: MULTICALL_ABI.encodeFunctionData('getCurrentBlockTimestamp', []) },
    { address, data: MULTICALL_ABI.encodeFunctionData('getCurrentBlockDifficulty', []) },
  ]
  const [timestamp, difficulty] = useChainCalls(address ? calls : [])

  return {
    timestamp: timestamp !== undefined && new Date(BigNumber.from(timestamp).mul(1000).toNumber()),
    difficulty: difficulty !== undefined && BigNumber.from(difficulty),
  }
}
