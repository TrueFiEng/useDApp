import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainCall } from './callsReducer'
import { Dispatch } from 'react'
import { ChainStateAction } from './chainStateReducer'
import { ChainId } from '../../../constants'
import { multicall } from './multicall'
import { notifyDevtools } from '../../devtools'

export function performMulticall(
  library: JsonRpcProvider,
  multicallAddress: string,
  blockNumber: number,
  uniqueCalls: ChainCall[],
  dispatchState: Dispatch<ChainStateAction>,
  chainId: ChainId,
  reportError: (error: Error) => void
) {
  const start = Date.now()
  multicall(library, multicallAddress, blockNumber, uniqueCalls)
    .then((state) => {
      dispatchState({ type: 'FETCH_SUCCESS', blockNumber, chainId, state })
      notifyDevtools({
        type: 'MULTICALL_SUCCESS',
        duration: Date.now() - start,
        chainId,
        blockNumber,
        multicallAddress,
        state,
      })
    })
    .catch((error) => {
      reportError(error)
      dispatchState({ type: 'FETCH_ERROR', blockNumber, chainId, error })
      notifyDevtools({
        type: 'MULTICALL_ERROR',
        duration: Date.now() - start,
        chainId,
        blockNumber,
        multicallAddress,
        calls: uniqueCalls,
        error,
      })
    })
}
