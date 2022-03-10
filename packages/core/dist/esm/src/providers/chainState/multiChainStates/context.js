import { createContext, useContext } from 'react';
export const MultiChainStatesContext = createContext({
    chains: {},
    dispatchCalls: () => undefined,
});
export function useMultiChainStates() {
    return useContext(MultiChainStatesContext);
}
//# sourceMappingURL=context.js.map