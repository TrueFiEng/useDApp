import { useEffect } from 'react'
import { useEthers } from '../../../hooks'
import { notifyDevtools } from '../../devtools'
import { RawCall } from './callsReducer'

export function useDevtoolsReporting(
  uniqueCallsJSON: string,
  uniqueCalls: RawCall[],
  blockNumber: number | undefined,
  multicallAddresses: { [network: string]: string }
) {
  const { chainId, account, error } = useEthers()

  const multicall = chainId !== undefined ? multicallAddresses[chainId] : undefined

  useEffect(() => {
    notifyDevtools({ type: 'NETWORK_CHANGED', chainId, multicallAddress: multicall })
  }, [chainId, multicall])

  useEffect(() => {
    notifyDevtools({ type: 'ACCOUNT_CHANGED', address: account ?? undefined })
  }, [account])

  useEffect(() => {
    notifyDevtools({ type: 'CALLS_CHANGED', chainId, calls: uniqueCalls })
  }, [uniqueCallsJSON])

  useEffect(() => {
    if (chainId !== undefined && blockNumber !== undefined) {
      notifyDevtools({ type: 'BLOCK_NUMBER_CHANGED', chainId, blockNumber })
    }
  }, [blockNumber, chainId])

  useEffect(() => {
    if (error !== undefined) {
      notifyDevtools({ type: 'GENERIC_ERROR', error })
    }
  }, [error])
}
