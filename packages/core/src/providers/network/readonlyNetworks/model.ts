import { ChainId } from '../../../constants'
import type { providers } from 'ethers'

export interface NetworkState {
  nonStaticCalls: number
}

export type Providers = {
  [chainId in ChainId]?: providers.BaseProvider
}

export type NetworkStates = {
  [chainId in ChainId]?: NetworkState
}

export interface ReadonlyNetworksModel{
  providers: Providers,
  updateNetworkState: (payload: Actions) => void
}

export interface UpdateNonStaticCallsCount {
  type: 'UPDATE_NON_STATIC_CALLS_COUNT',
  count: {
    [chainId: number]: number
  }
}

export type Actions = UpdateNonStaticCallsCount
