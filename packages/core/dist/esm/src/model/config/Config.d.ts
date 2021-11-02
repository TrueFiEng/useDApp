import { ChainId } from '../../constants';
export declare type NodeUrls = {
    [chainId: number]: string;
};
export declare type MulticallAddresses = {
    [chainId: number]: string;
};
export declare type FullConfig = {
    readOnlyChainId?: ChainId;
    readOnlyUrls?: NodeUrls;
    multicallAddresses?: MulticallAddresses;
    supportedChains: number[];
    pollingInterval?: number;
    notifications: {
        checkInterval: number;
        expirationPeriod: number;
    };
    localStorage: {
        transactionPath: string;
    };
};
export declare type Config = Partial<FullConfig>;
//# sourceMappingURL=Config.d.ts.map