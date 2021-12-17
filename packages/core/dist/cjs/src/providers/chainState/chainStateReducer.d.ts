import { ChainState } from './model';
export interface State {
    [chainId: number]: {
        blockNumber: number;
        state?: ChainState;
        error?: unknown;
    } | undefined;
}
declare type Action = FetchSuccess | FetchError;
interface FetchSuccess {
    type: 'FETCH_SUCCESS';
    chainId: number;
    blockNumber: number;
    state: ChainState;
}
interface FetchError {
    type: 'FETCH_ERROR';
    chainId: number;
    blockNumber: number;
    error: unknown;
}
export declare function chainStateReducer(state: State | undefined, action: Action): State;
export {};
//# sourceMappingURL=chainStateReducer.d.ts.map