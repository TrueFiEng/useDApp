import { Connector } from './connector'

export class ConnectorController {
  constructor(public readonly connector: Connector) {
    connector.onUpdate = ({ chainId, accounts }) => {
      this.chainId = chainId
      this.accounts = accounts
    }

    void this.connector.connectEagerly()
  }

  public active = false
  public accounts: string[] = []
  public chainId = 0

  getProvider() {
    return this.connector.provider
  }

  async activate() {
    await this.connector.activate()
    this.active = true
  }

  async deactivate() {
    this.active = false
    await this.connector.deactivate()
  }
}
