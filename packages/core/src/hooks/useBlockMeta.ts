import { MultiCallABI } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { useMulticallAddress } from './useMulticallAddress'
import { QueryParams } from '../constants/type/QueryParams'
import { useConfig, useNetwork } from '../providers'
import { useRawCall } from './useRawCalls'

const GET_CURRENT_BLOCK_TIMESTAMP_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', [])
const GET_CURRENT_BLOCK_DIFFICULTY_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', [])

/**
 * Queries block metadata.
 * @public
 */
export function useBlockMeta(queryParams: QueryParams = {}) {
  const { network } = useNetwork()
  const { readOnlyChainId } = useConfig()
  const chainId = queryParams.chainId ?? network.chainId ?? readOnlyChainId

  const address = useMulticallAddress(queryParams)
  const timestamp = useRawCall(
    address && chainId !== undefined && { address, data: GET_CURRENT_BLOCK_TIMESTAMP_CALL, chainId }
  )
  const difficulty = useRawCall(
    address && chainId !== undefined && { address, data: GET_CURRENT_BLOCK_DIFFICULTY_CALL, chainId }
  )

  return {
    timestamp: timestamp !== undefined ? new Date(BigNumber.from(timestamp.value).mul(1000).toNumber()) : undefined,
    difficulty: difficulty !== undefined ? BigNumber.from(difficulty.value) : undefined,
  }
}
