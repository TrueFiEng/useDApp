import { RawCall, ChainState } from './chainState';
interface Init {
    type: 'INIT';
}
interface NetworkChanged {
    type: 'NETWORK_CHANGED';
    chainId?: number;
    multicallAddress?: string;
}
interface BlockNumberChanged {
    type: 'BLOCK_NUMBER_CHANGED';
    chainId: number;
    blockNumber: number;
}
interface AccountChanged {
    type: 'ACCOUNT_CHANGED';
    address?: string;
}
interface CallsChanged {
    type: 'CALLS_CHANGED';
    chainId?: number;
    calls: RawCall[];
}
interface MulticallSuccess {
    type: 'MULTICALL_SUCCESS';
    multicallAddress: string;
    duration: number;
    chainId: number;
    blockNumber: number;
    state: ChainState;
}
interface MulticallError {
    type: 'MULTICALL_ERROR';
    multicallAddress: string;
    duration: number;
    calls: RawCall[];
    chainId: number;
    blockNumber: number;
    error: any;
}
interface GenericError {
    type: 'GENERIC_ERROR';
    error: Error;
}
declare type Notification = Init | NetworkChanged | BlockNumberChanged | AccountChanged | CallsChanged | MulticallSuccess | MulticallError | GenericError;
export declare function notifyDevtools(notification: Notification): void;
export {};
//# sourceMappingURL=devtools.d.ts.map