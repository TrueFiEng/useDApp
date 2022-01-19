import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export interface Network {
  provider?: JsonRpcProvider
  chainId?: ChainId
  accounts: string[]
}

interface UpdateNetwork {
  type: 'UPDATE_NETWORK'
  network: Partial<Network>
}

export type Actions = UpdateNetwork
