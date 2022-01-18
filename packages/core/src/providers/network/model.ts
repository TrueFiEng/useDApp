import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export interface Network {
  provider?: JsonRpcProvider
  chainId?: ChainId
  accounts: string[]
}

interface UpdateNetwork extends Network {
  type: 'UPDATE_NETWORK'
}

export type Actions = UpdateNetwork
