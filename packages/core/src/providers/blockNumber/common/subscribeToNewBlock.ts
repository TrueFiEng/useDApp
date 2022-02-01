import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '../../../constants'
import { Dispatch } from 'react'
import { BlockNumberChanged } from './reducer'

export function subscribeToNewBlock(
  provider: JsonRpcProvider | undefined,
  chainId: ChainId | undefined,
  dispatch: Dispatch<BlockNumberChanged>
) {
  if (provider && chainId !== undefined) {
    const update = (blockNumber: number) => dispatch({ chainId, blockNumber })
    provider.on('block', update)
    return () => {
      provider.off('block', update)
    }
  }

  return () => undefined
}
