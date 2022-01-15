import { useCallback, useEffect, useState } from 'react'
import { useEthers } from './useEthers'

export type ChainConnectionState = 'Disconnected' | 'PendingNetworkConnection' | 'WrongNetwork' | 'Connected'

interface ChainConnectionStatePayload {
  state: ChainConnectionState
  isDisconnected: boolean
  isPendingConnection: boolean
  isWrongNetwork: boolean
  isConnected: boolean
}

export type UseChainConnectionState = (expectedChainId?: number) => ChainConnectionStatePayload

export const useChainConnectionState: UseChainConnectionState = (expectedChainId) => {
  const [state, setChainConnectionState] = useState<ChainConnectionState>('Disconnected')
  const { account, chainId } = useEthers()

  const updateChainConnectionState = useCallback(() => {
    if (!account) {
      setChainConnectionState('Disconnected')
      return
    }

    if (!chainId) {
      setChainConnectionState('PendingNetworkConnection')
      return
    }

    if (!expectedChainId || expectedChainId === chainId) {
      setChainConnectionState('Connected')
      return
    }

    setChainConnectionState('WrongNetwork')
  }, [account, chainId, expectedChainId])

  useEffect(() => {
    updateChainConnectionState()
  }, [updateChainConnectionState])

  return {
    state,
    isDisconnected: 'Disconnected' === state,
    isPendingConnection: 'PendingNetworkConnection' === state,
    isWrongNetwork: 'WrongNetwork' === state,
    isConnected: 'Connected' === state,
  }
}
