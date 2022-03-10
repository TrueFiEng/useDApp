import { JsonRpcProvider } from '@ethersproject/providers';
import { RawCall } from './callsReducer';
import { Dispatch } from 'react';
import { ChainStateAction } from './chainStateReducer';
import { ChainId } from '../../../constants';
export declare function performMulticall(provider: JsonRpcProvider, multicallExecutor: (provider: JsonRpcProvider, multicallAddress: string, blockNumber: number, uniqueCalls: RawCall[]) => Promise<any>, multicallAddress: string, blockNumber: number, uniqueCalls: RawCall[], dispatchState: Dispatch<ChainStateAction>, chainId: ChainId, reportError: (error: Error) => void): void;
//# sourceMappingURL=performMulticall.d.ts.map