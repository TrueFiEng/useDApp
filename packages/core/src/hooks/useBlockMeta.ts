import { ChainId, MultiCallABI } from '../constants'
import { BigNumber } from 'ethers'
import { useMulticallAddress } from './useMulticallAddress'
import { QueryParams } from '../constants/type/QueryParams'
import { useRawCall } from './useRawCalls'
import { useChainId } from './useChainId'
import { useConfig } from './useConfig'
import { useBlockNumbers } from './useBlockNumbers'

const GET_CURRENT_BLOCK_TIMESTAMP_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', [])
const GET_CURRENT_BLOCK_DIFFICULTY_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', [])

/**
 * Queries block metadata.
 * @public
 */
export function useBlockMeta(queryParams: QueryParams = {}) {
  const chainId = useChainId({ queryParams })
  const { refresh: configRefresh } = useConfig()
  const blockNumbers = useBlockNumbers()

  const address = useMulticallAddress(queryParams)
  const refresh = queryParams.refresh ?? configRefresh
  const isStatic = queryParams.isStatic ?? refresh === 'never'
  const refreshPerBlocks = typeof refresh === 'number' ? refresh : undefined
  const timestamp = useRawCall(
    address &&
      chainId !== undefined && {
        address,
        data: GET_CURRENT_BLOCK_TIMESTAMP_CALL,
        chainId,
        isStatic,
        refreshPerBlocks,
      }
  )
  const difficulty = useRawCall(
    address &&
      chainId !== undefined && {
        address,
        data: GET_CURRENT_BLOCK_DIFFICULTY_CALL,
        chainId,
        isStatic,
        refreshPerBlocks,
      }
  )

  return {
    timestamp: timestamp !== undefined ? new Date(BigNumber.from(timestamp.value).mul(1000).toNumber()) : undefined,
    difficulty: difficulty !== undefined ? BigNumber.from(difficulty.value) : undefined,
    blockNumber: chainId ? blockNumbers[chainId as ChainId] : undefined,
  }
}
