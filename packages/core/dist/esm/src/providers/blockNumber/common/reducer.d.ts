interface BlockNumberState {
    [chainId: number]: number | undefined;
}
export interface BlockNumberChanged {
    chainId: number;
    blockNumber: number;
}
export declare function blockNumberReducer(state: BlockNumberState | undefined, action: BlockNumberChanged): BlockNumberState;
export {};
//# sourceMappingURL=reducer.d.ts.map