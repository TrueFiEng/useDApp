import { createContext, useContext } from 'react';
export const InjectedNetworkContext = createContext({
    injectedProvider: undefined,
    connect: async () => undefined,
});
export function useInjectedNetwork() {
    return useContext(InjectedNetworkContext);
}
//# sourceMappingURL=context.js.map