import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useReducer } from 'react';
import { BlockNumberContext } from './context';
import { blockNumberReducer } from './reducer';
import { useEthers, useDebounce } from '../../hooks';
export function BlockNumberProvider({ children }) {
    const { library, chainId } = useEthers();
    const [state, dispatch] = useReducer(blockNumberReducer, {});
    useEffect(() => {
        if (library && chainId !== undefined) {
            const update = (blockNumber) => dispatch({ chainId, blockNumber });
            library.on('block', update);
            return () => {
                library.off('block', update);
            };
        }
    }, [library, chainId]);
    const debouncedState = useDebounce(state, 100);
    const blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined;
    return _jsx(BlockNumberContext.Provider, { value: blockNumber, children: children }, void 0);
}
//# sourceMappingURL=provider.js.map