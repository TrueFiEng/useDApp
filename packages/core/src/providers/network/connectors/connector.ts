import { providers } from 'ethers'
import { ReadOnlyEvent } from '../../../helpers/event'

export interface Update {
  chainId: number
  accounts: string[]
}

export interface Connector {
  provider?: providers.Web3Provider | providers.JsonRpcProvider

  name: string

  update: ReadOnlyEvent<Update>

  connectEagerly(): Promise<void>

  activate(): Promise<void>

  deactivate(): Promise<void>
}
