import { BaseProvider } from '@ethersproject/providers'
import { RawCall } from './callsReducer'
import { Dispatch } from 'react'
import { ChainStateAction } from './chainStateReducer'
import { ChainId } from '../../../constants'
import { notifyDevtools } from '../../devtools'

export function performMulticall(
  provider: BaseProvider,
  multicallExecutor: (
    provider: BaseProvider,
    multicallAddress: string,
    blockNumber: number,
    uniqueCalls: RawCall[]
  ) => Promise<any>,
  multicallAddress: string,
  blockNumber: number,
  uniqueCalls: RawCall[],
  dispatchState: Dispatch<ChainStateAction>,
  chainId: ChainId,
  reportError: (error: Error) => void
) {
  const start = Date.now()
  multicallExecutor(provider, multicallAddress, blockNumber, uniqueCalls)
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
