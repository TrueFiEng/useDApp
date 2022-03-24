import { Provider } from '@ethersproject/providers';
import { RawCall } from './callsReducer';
import { ChainState } from './model';
export declare function multicall2(provider: Provider, address: string, blockNumber: number, requests: RawCall[]): Promise<ChainState>;
//# sourceMappingURL=multicall2.d.ts.map