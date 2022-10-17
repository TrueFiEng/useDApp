import { ChainId } from '../../../constants'
import type { providers } from 'ethers'

export interface NetworkState {
  errors: Error[]
}

export type Providers = {
  [chainId in ChainId]?: providers.BaseProvider
}

export type NetworkStates = {
  [chainId in ChainId]?: NetworkState
}

export interface ReadonlyNetworksModel {
  providers: Providers
  updateNetworkState: (payload: Actions) => void
  networkStates: NetworkStates
}

export interface PropagateChainError {
  type: 'ADD_ERROR'
  chainId: ChainId
  error: Error
}

export type Actions = PropagateChainError
