import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { MockProvider } from '@ethereum-waffle/provider'

// Modified from https://github.com/NoahZinsmeister/web3-react/blob/v6/packages/network-connector/src/index.ts
export class MockConnector extends AbstractConnector {
  private provider: any
  private chainId = 469

  constructor(provider?: any) {
    super()
    this.provider = provider ?? new MockProvider()
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
