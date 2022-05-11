import { BaseProvider, Web3Provider } from "@ethersproject/providers";
import { Connector, ConnectorPriority, UpdateFn } from "../connector";
import detectMetamask from '@metamask/detect-provider'

export class MetamaskConnector implements Connector {
  public provider?: Web3Provider;
  public priority = ConnectorPriority.Wallet;
  public name = 'Metamask';

  constructor() {

  }

  onUpdate?: UpdateFn;

  private async init() {
    const metamask = await detectMetamask();
    this.provider = new Web3Provider(metamask as any);
  }

  async connectEagerly(): Promise<void> {
    await this.init();

    const chainId: string = await this.provider!.send('eth_chainId', [])
    const accounts: string[] = await this.provider!.send('eth_accounts', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts });
  }

  async activate(): Promise<void> {
    const chainId: string = await this.provider!.send('eth_chainId', [])
    const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts });
  }

  async deactivate(): Promise<void> {
    
  }
}