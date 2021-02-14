import { MultiCallABI } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainCall } from '../providers'
import { useMulticallAddress, useChainCalls } from '.'

export function useBlockMeta() {
  const address = useMulticallAddress()

  const calls: ChainCall[] = [
    { address, data: MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', []) },
    { address, data: MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', []) },
  ]
  const [timestamp, difficulty] = useChainCalls(address ? calls : [])

  return {
    timestamp: timestamp !== undefined ? new Date(BigNumber.from(timestamp).mul(1000).toNumber()) : undefined,
    difficulty: difficulty !== undefined ? BigNumber.from(difficulty) : undefined,
  }
}
