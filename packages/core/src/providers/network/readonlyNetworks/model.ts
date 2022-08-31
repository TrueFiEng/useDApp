import { ChainId } from '../../../constants'
import type { providers } from 'ethers'

export interface NetworkState {
  nonStaticCalls: number,
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
  updateNetworkState: (payload: Actions) => void,
  networkStates: NetworkStates
}

export interface UpdateNonStaticCallsCount {
  type: 'UPDATE_NON_STATIC_CALLS_COUNT'
  chainId: ChainId
  count: number
}

export interface PropagateChainError {
  type: 'ADD_ERROR'
  chainId: ChainId
  error: Error
}

export type Actions = UpdateNonStaticCallsCount | PropagateChainError
