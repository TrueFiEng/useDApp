import { createContext, useContext } from 'react';
export const BlockNumbersContext = createContext({});
export function useBlockNumbers() {
    return useContext(BlockNumbersContext);
}
//# sourceMappingURL=context.js.map