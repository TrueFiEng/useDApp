import { QueryParams } from '../constants/type/QueryParams';
import { Action, SingleChainState } from '../providers';
export declare function useChainState(queryParams?: QueryParams): (Partial<SingleChainState> & {
    dispatchCalls: (action: Action) => void;
}) | undefined;
//# sourceMappingURL=useChainState.d.ts.map