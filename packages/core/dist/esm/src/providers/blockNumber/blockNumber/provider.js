import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useReducer } from 'react';
import { BlockNumberContext } from './context';
import { blockNumberReducer } from '../common/reducer';
import { useDebounce, useEthers } from '../../../hooks';
import { subscribeToNewBlock } from '../common/subscribeToNewBlock';
export function BlockNumberProvider({ children }) {
    const { library, chainId } = useEthers();
    const [state, dispatch] = useReducer(blockNumberReducer, {});
    useEffect(() => subscribeToNewBlock(library, chainId, dispatch), [library, chainId]);
    const debouncedState = useDebounce(state, 100);
    const blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined;
    return _jsx(BlockNumberContext.Provider, { value: blockNumber, children: children });
}
//# sourceMappingURL=provider.js.map