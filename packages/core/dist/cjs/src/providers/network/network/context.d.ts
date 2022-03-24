/// <reference types="react" />
import { Network } from './model';
import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers';
export declare const NetworkContext: import("react").Context<{
    update: (network: Partial<Network>) => void;
    reportError: (error: Error) => void;
    activate: (provider: JsonRpcProvider | ExternalProvider) => Promise<void>;
    deactivate: () => void;
    network: Network;
}>;
export declare function useNetwork(): {
    update: (network: Partial<Network>) => void;
    reportError: (error: Error) => void;
    activate: (provider: JsonRpcProvider | ExternalProvider) => Promise<void>;
    deactivate: () => void;
    network: Network;
};
//# sourceMappingURL=context.d.ts.map