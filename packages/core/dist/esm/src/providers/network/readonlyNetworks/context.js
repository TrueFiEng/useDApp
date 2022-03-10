import { createContext, useContext } from 'react';
export const ReadonlyNetworksContext = createContext({});
export function useReadonlyNetworks() {
    return useContext(ReadonlyNetworksContext);
}
//# sourceMappingURL=context.js.map