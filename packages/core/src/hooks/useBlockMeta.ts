import { MULTICALL_ABI } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { useMulticallAddress, useChainCalls } from '.'

export function useBlockMeta() {
  const address = useMulticallAddress()

  const [timestamp, difficulty] = useChainCalls(!address ? [] : [
    {address, data: MULTICALL_ABI.encodeFunctionData('getCurrentBlockTimestamp', [])},
    {address, data: MULTICALL_ABI.encodeFunctionData('getCurrentBlockDifficulty', [])},
  ])

  return {
    timestamp: timestamp !== undefined && new Date(BigNumber.from(timestamp).mul(1000).toNumber()),
    difficulty: difficulty !== undefined && BigNumber.from(difficulty),
  }
}
