import { providers } from 'ethers'
import { Event, ReadOnlyEvent } from '../../../helpers/event'

export enum ConnectorPriority {
  ApiNode = 1,
  Wallet = 2,
}

export interface Update {
  chainId: number
  accounts: string[]
}

export interface Connector {
  provider?: providers.Web3Provider | providers.JsonRpcProvider

  update: ReadOnlyEvent<Update>

  activate(): Promise<void>

  deactivate(): Promise<void>
}
