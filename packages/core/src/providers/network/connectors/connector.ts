import { providers } from 'ethers'
import { ReadOnlyEvent } from '../../../helpers/event'

export interface ConnectorUpdateData {
  chainId: number
  accounts: string[]
}

export interface Connector {
  provider?: providers.Web3Provider | providers.JsonRpcProvider

  name: string

  update: ReadOnlyEvent<ConnectorUpdateData>

  connectEagerly(): Promise<void>

  activate(): Promise<void>

  deactivate(): Promise<void>
}
