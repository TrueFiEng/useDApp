import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers';
declare type MaybePromise<T> = Promise<T> | any;
declare type SupportedProviders = JsonRpcProvider | ExternalProvider | {
    getProvider: () => MaybePromise<JsonRpcProvider | ExternalProvider>;
    activate: () => Promise<any>;
};
export declare type Web3Ethers = {
    activate: (provider: SupportedProviders) => Promise<void>;
    setError: (error: Error) => void;
    deactivate: () => void;
    connector: undefined;
    chainId?: number;
    account?: null | string;
    error?: Error;
    library?: JsonRpcProvider;
    active: boolean;
    activateBrowserWallet: () => void;
};
export declare function useEthers(): Web3Ethers;
export {};
//# sourceMappingURL=useEthers.d.ts.map