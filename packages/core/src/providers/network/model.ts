import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export interface Network {
  provider?: JsonRpcProvider
  chainId?: ChainId
  accounts: string[]
  errors: Error[]
}

interface UpdateNetwork {
  type: 'UPDATE_NETWORK'
  network: Partial<Network>
}

interface AddError {
  type: 'ADD_ERROR'
  error: Error
}

export type Actions = UpdateNetwork | AddError
