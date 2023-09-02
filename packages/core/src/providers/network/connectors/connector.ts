import { BrowserProvider, JsonRpcProvider } from 'ethers'
import { ReadOnlyEvent } from '../../../helpers/event'

export interface ConnectorUpdateData {
  chainId: number
  accounts: string[]
}

export type ConnectorProvider = JsonRpcProvider | BrowserProvider

export interface Connector {
  provider?: ConnectorProvider

  name: string

  update: ReadOnlyEvent<ConnectorUpdateData>

  connectEagerly(): Promise<void>

  activate(): Promise<void>

  deactivate(): Promise<void>
}

export const isConnector = (obj: any): obj is Connector => {
  return (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'update' in obj &&
    'connectEagerly' in obj &&
    'activate' in obj &&
    'deactivate' in obj
  )
}
