import { createContext, useContext } from 'react';
import { ChainId } from '../../../constants';
export const NetworkContext = createContext({
    network: {
        provider: undefined,
        chainId: ChainId.Mainnet,
        accounts: [],
        errors: [],
    },
    update: () => undefined,
    reportError: () => undefined,
    activate: async () => undefined,
    deactivate: () => undefined,
});
export function useNetwork() {
    return useContext(NetworkContext);
}
//# sourceMappingURL=context.js.map