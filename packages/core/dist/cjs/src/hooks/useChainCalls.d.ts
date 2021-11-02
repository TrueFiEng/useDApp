import { ChainCall } from '../providers/chainState/callsReducer';
import { Falsy } from '../model/types';
export declare function useChainCalls(calls: (ChainCall | Falsy)[]): (string | false | 0 | null | undefined)[];
export declare function useChainCall(call: ChainCall | Falsy): string | false | 0 | null | undefined;
//# sourceMappingURL=useChainCalls.d.ts.map