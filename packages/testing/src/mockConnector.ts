import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { MockProvider } from '@ethereum-waffle/provider'

// Modified from https://github.com/NoahZinsmeister/web3-react/blob/v6/packages/network-connector/src/index.ts
export class MockConnector extends AbstractConnector {
  private readonly provider: any
  private readonly chainId: number

  constructor(provider?: any, chainId?: number) {
    super()
    this.provider = provider ?? new MockProvider()
    this.chainId = chainId ?? 1337
  }

  public async activate(): Promise<ConnectorUpdate> {
    return { provider: this.provider, chainId: this.chainId, account: null }
  }

  public async getProvider() {
    return this.provider
  }

  public async getChainId(): Promise<number> {
    return this.chainId
  }

  public async getAccount() {
    return null
  }

  public deactivate() {
    return
  }
}
