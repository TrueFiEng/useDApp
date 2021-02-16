import { MultiCallABI } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { useChainCall } from './useChainCalls'
import { useMulticallAddress } from './useMulticallAddress'

export function useBlockMeta() {
  const address = useMulticallAddress()
  const timestamp = useChainCall({ address, data: MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', []) })
  const difficulty = useChainCall({ address, data: MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', []) })

  return {
    timestamp: timestamp !== undefined ? new Date(BigNumber.from(timestamp).mul(1000).toNumber()) : undefined,
    difficulty: difficulty !== undefined ? BigNumber.from(difficulty) : undefined,
  }
}
