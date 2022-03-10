/// <reference types="react" />
import { Action, ChainState } from '..';
export interface SingleChainState {
    value?: {
        blockNumber: number;
        state?: ChainState;
        error?: unknown;
    };
    multicallAddress: string | undefined;
}
export declare type MultiChainState = {
    [chainId in number]?: SingleChainState;
};
export declare const MultiChainStatesContext: import("react").Context<{
    chains: MultiChainState;
    dispatchCalls: (action: Action) => void;
}>;
export declare function useMultiChainStates(): {
    chains: MultiChainState;
    dispatchCalls: (action: Action) => void;
};
//# sourceMappingURL=context.d.ts.map