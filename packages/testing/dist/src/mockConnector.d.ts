import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
export declare class MockConnector extends AbstractConnector {
    private readonly provider;
    private readonly chainId;
    constructor(provider?: any, chainId?: number);
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number>;
    getAccount(): Promise<null>;
    deactivate(): void;
}
//# sourceMappingURL=mockConnector.d.ts.map