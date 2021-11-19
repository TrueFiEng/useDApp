import { MultiCallABI } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { useChainCall } from './useChainCalls'
import { useMulticallAddress } from './useMulticallAddress'

export const GET_CURRENT_BLOCK_TIMESTAMP_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', [])
export const GET_CURRENT_BLOCK_DIFFICULTY_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', [])

export const parseTimestamp = (timestamp: ReturnType<typeof useChainCall>) =>
  timestamp !== undefined ? new Date(BigNumber.from(timestamp).mul(1000).toNumber()) : undefined

export const parseDifficulty = (difficulty: ReturnType<typeof useChainCall>) =>
  difficulty !== undefined ? BigNumber.from(difficulty) : undefined

export function useBlockMeta() {
  const address = useMulticallAddress()
  const timestamp = useChainCall(address && { address, data: GET_CURRENT_BLOCK_TIMESTAMP_CALL })
  const difficulty = useChainCall(address && { address, data: GET_CURRENT_BLOCK_DIFFICULTY_CALL })

  return {
    timestamp: parseTimestamp(timestamp),
    difficulty: parseDifficulty(difficulty),
  }
}
