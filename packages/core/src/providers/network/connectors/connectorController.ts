import { providers } from 'ethers'
import { DEFAULT_SUPPORTED_CHAINS } from '../../../constants'
import { subscribeToProviderEvents } from '../../../helpers'
import { Event } from '../../../helpers/event'
import { getAddNetworkParams } from '../../../helpers/getAddNetworkParams'
import { validateArguments } from '../../../helpers/validateArgument'
import { Connector } from './connector'

export interface ControllerUpdateInfo {
  active: ConnectorController['active']
  accounts: ConnectorController['accounts']
  chainId: ConnectorController['chainId']
  blockNumber: ConnectorController['blockNumber']
  errors: ConnectorController['errors']
}

export class ConnectorController {
  readonly updated = new Event<ControllerUpdateInfo>()
  readonly newBlock = new Event<number>()

  public active = false
  public accounts: string[] = []
  public chainId: number | undefined
  public blockNumber: number | undefined
  public errors: Error[] = []

  private emitUpdate() {
    this.updated.emit({
      active: this.active,
      chainId: this.chainId,
      accounts: this.accounts,
      blockNumber: this.blockNumber,
      errors: this.errors,
    })
  }

  private removeBlockEffect?: () => void
  private clearSubscriptions?: () => void

  constructor(public readonly connector: Connector) {
    connector.update.on(({ chainId, accounts }) => {
      this.chainId = chainId
      this.accounts = accounts
      this.emitUpdate()
    })
  }

  getProvider(): providers.Web3Provider | providers.JsonRpcProvider | undefined {
    return this.connector.provider
  }

  async activate() {
    await this.connector.activate()
    const provider = this.getProvider()
    if (!provider) {
      throw new Error('Failed to activate connector')
    }

    this.clearSubscriptions = subscribeToProviderEvents(this.connector, ({ chainId, accounts }) => {
      if (chainId !== undefined) {
        this.chainId = chainId
      }
      if (accounts !== undefined) {
        this.accounts = accounts
      }
      this.emitUpdate()
    })

    this.blockNumber = await provider.getBlockNumber()
    this.newBlock.emit(this.blockNumber)
    this.removeBlockEffect = this.newBlock.addEffect(() => {
      const listener = (blockNumber: number) => {
        this.blockNumber = blockNumber
        this.newBlock.emit(blockNumber)
        this.emitUpdate()
      }

      provider.on('block', listener)

      return () => {
        provider.off('block', listener)
      }
    })

    this.emitUpdate()
  }

  async deactivate() {
    this.active = false
    this.removeBlockEffect?.()
    this.clearSubscriptions?.()
    await this.connector.deactivate()
    this.emitUpdate()
  }

  async switchNetwork(chainId: number) {
    const provider = this.getProvider()

    validateArguments({ chainId }, { chainId: 'number' })

    if (!provider) {
      throw new Error('Connector not initialized')
    }

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${chainId.toString(16)}` }])
    } catch (error: any) {
      const errChainNotAddedYet = 4902 // Metamask error code
      if (error.code === errChainNotAddedYet) {
        const chain = DEFAULT_SUPPORTED_CHAINS?.find((chain) => chain.chainId === chainId)
        if (chain?.rpcUrl) {
          await provider.send('wallet_addEthereumChain', [getAddNetworkParams(chain)])
        }
      } else {
        throw error
      }
    }
  }

  reportError(error: Error) {
    this.errors.push(error)
    this.emitUpdate()
  }
}
