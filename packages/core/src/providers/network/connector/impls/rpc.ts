import { BaseProvider, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Connector, ConnectorPriority, UpdateFn } from "../connector";

export class RpcConnector implements Connector {
  public provider: BaseProvider;
  public priority = ConnectorPriority.ApiNode;
  public name = 'RPC';

  public onUpdate?: UpdateFn;

  constructor(
    public url: string,
  ) {
    this.provider = new JsonRpcProvider(url);
  }

  async connectEagerly(): Promise<void> {
    const { chainId } = await this.provider!.getNetwork();
    this.onUpdate?.({ chainId, accounts: [] });
  }
  async activate(): Promise<void> {
    const { chainId } = await this.provider!.getNetwork();
    this.onUpdate?.({ chainId, accounts: [] });
  }
  async deactivate(): Promise<void> {
  }
}