export declare type Action = AddCall | RemoveCall;
export interface ChainCall {
    address: string;
    data: string;
}
interface AddCall {
    type: 'ADD_CALLS';
    calls: ChainCall[];
}
interface RemoveCall {
    type: 'REMOVE_CALLS';
    calls: ChainCall[];
}
export declare function callsReducer(state: ChainCall[] | undefined, action: Action): ChainCall[];
export {};
//# sourceMappingURL=callsReducer.d.ts.map