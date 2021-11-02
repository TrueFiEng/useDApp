import { ChainId } from '../constants';
import { ChainCall, ChainState } from './chainState';
interface Init {
    type: 'INIT';
}
interface NetworkChanged {
    type: 'NETWORK_CHANGED';
    chainId?: ChainId;
    multicallAddress?: string;
}
interface BlockNumberChanged {
    type: 'BLOCK_NUMBER_CHANGED';
    chainId: ChainId;
    blockNumber: number;
}
interface AccountChanged {
    type: 'ACCOUNT_CHANGED';
    address?: string;
}
interface CallsChanged {
    type: 'CALLS_CHANGED';
    chainId?: ChainId;
    calls: ChainCall[];
}
interface MulticallSuccess {
    type: 'MULTICALL_SUCCESS';
    multicallAddress: string;
    duration: number;
    chainId: ChainId;
    blockNumber: number;
    state: ChainState;
}
interface MulticallError {
    type: 'MULTICALL_ERROR';
    multicallAddress: string;
    duration: number;
    calls: ChainCall[];
    chainId: ChainId;
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