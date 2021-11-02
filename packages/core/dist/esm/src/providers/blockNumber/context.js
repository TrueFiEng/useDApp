import { createContext, useContext } from 'react';
export const BlockNumberContext = createContext(undefined);
export function useBlockNumber() {
    return useContext(BlockNumberContext);
}
//# sourceMappingURL=context.js.map