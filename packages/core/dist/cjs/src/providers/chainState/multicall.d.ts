import { Provider } from '@ethersproject/providers';
import { ChainCall } from './callsReducer';
import { ChainState } from './model';
export declare function multicall(provider: Provider, address: string, blockNumber: number, requests: ChainCall[]): Promise<ChainState>;
//# sourceMappingURL=multicall.d.ts.map