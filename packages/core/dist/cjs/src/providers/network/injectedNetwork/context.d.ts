/// <reference types="react" />
import { Web3Provider } from '@ethersproject/providers';
export declare const InjectedNetworkContext: import("react").Context<{
    injectedProvider: Web3Provider | undefined;
    connect: () => Promise<Web3Provider | undefined>;
}>;
export declare function useInjectedNetwork(): {
    injectedProvider: Web3Provider | undefined;
    connect: () => Promise<Web3Provider | undefined>;
};
//# sourceMappingURL=context.d.ts.map