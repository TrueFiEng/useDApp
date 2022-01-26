import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export interface Network {
  provider?: JsonRpcProvider
  chainId?: ChainId
  accounts: string[]
}

export type NetworkError =
  | Error
  | {
      chainId: ChainId
      error: Error
    }

export type Networks = {
  networks: Partial<
    {
      [chainId in ChainId]: Network
    }
  >
  errors: NetworkError[]
}

interface UpdateNetwork {
  type: 'UPDATE_NETWORK'
  chainId: ChainId
  network: Partial<Network>
}

interface AddError {
  type: 'ADD_ERROR'
  error: NetworkError
}

interface ChangeChainId {
  type: 'CHANGE_CHAIN_ID'
  oldChainId: ChainId
  newChainId: ChainId
}

export type Actions = UpdateNetwork | AddError | ChangeChainId
