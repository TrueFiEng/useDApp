import { providers } from 'ethers'
import { EventEmitter } from 'events'
import { Connector } from './connector'

export class ConnectorController extends EventEmitter {
  constructor(public readonly connector: Connector) {
    super()
    connector.onUpdate = ({ chainId, accounts }) => {
      this.chainId = chainId
      this.accounts = accounts
      this.emit('update', { chainId, accounts })
      // controller is to be removed
    }

    // void this.connector.connectEagerly()
  }

  public active = false
  public accounts: string[] = []
  public chainId = 0

  getProvider(): providers.Web3Provider | providers.JsonRpcProvider | undefined {
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

// this.chainId.set(chainId)
// const chainId = useSubscribe(connectorController.chainId)

// 1. Remove connector controller
// 2. where we take connector.chainId, subscribe to onUpdate in useEffect((), [activeConnector])
