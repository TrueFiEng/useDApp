import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'

export enum ConnectorPriority {
  ApiNode = 1,
  Wallet = 2,
}

export interface Update {
  chainId: number
  accounts: string[]
}

export type UpdateFn = (data: Update) => void

export interface Connector {
  name: string
  priority: ConnectorPriority

  provider?: Web3Provider | JsonRpcProvider

  getTag(): string

  onUpdate?: UpdateFn

  connectEagerly(): Promise<void>

  activate(): Promise<void>

  deactivate(): Promise<void>
}
