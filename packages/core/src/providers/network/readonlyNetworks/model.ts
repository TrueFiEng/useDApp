import { Provider } from 'ethers'
import { ChainId } from '../../../constants'

export interface NetworkState {
  errors: Error[]
}

export type Providers = {
  [chainId in ChainId]?: Provider
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
