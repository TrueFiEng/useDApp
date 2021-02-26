import { MultiCallABI } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { useChainCall } from './useChainCalls'
import { useMulticallAddress } from './useMulticallAddress'

const GET_CURRENT_BLOCK_TIMESTAMP_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', [])
const GET_CURRENT_BLOCK_DIFFICULTY_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', [])

export function useBlockMeta() {
  const address = useMulticallAddress()
  const timestamp = useChainCall(address && { address, data: GET_CURRENT_BLOCK_TIMESTAMP_CALL })
  const difficulty = useChainCall(address && { address, data: GET_CURRENT_BLOCK_DIFFICULTY_CALL })

  return {
    timestamp: timestamp !== undefined ? new Date(BigNumber.from(timestamp).mul(1000).toNumber()) : undefined,
    difficulty: difficulty !== undefined ? BigNumber.from(difficulty) : undefined,
  }
}
