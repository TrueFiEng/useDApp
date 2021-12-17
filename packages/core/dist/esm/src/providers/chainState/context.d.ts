/// <reference types="react" />
import { Action } from './callsReducer';
import { ChainState } from './model';
export declare const ChainStateContext: import("react").Context<{
    value?: {
        blockNumber: number;
        state?: ChainState | undefined;
        error?: unknown;
    } | undefined;
    multicallAddress: string | undefined;
    dispatchCalls: (action: Action) => void;
}>;
export declare function useChainState(): {
    value?: {
        blockNumber: number;
        state?: ChainState | undefined;
        error?: unknown;
    } | undefined;
    multicallAddress: string | undefined;
    dispatchCalls: (action: Action) => void;
};
//# sourceMappingURL=context.d.ts.map