import { createContext, useContext } from 'react';
export const ChainStateContext = createContext({
    multicallAddress: '',
    dispatchCalls: () => {
        // empty
    },
});
export function useChainState() {
    return useContext(ChainStateContext);
}
//# sourceMappingURL=context.js.map