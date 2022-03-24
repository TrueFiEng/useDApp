import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useReducer } from 'react';
import { useDebounce } from '../../../hooks';
import { useReadonlyNetworks } from '../../network';
import { BlockNumbersContext } from './context';
import { blockNumberReducer } from '../common/reducer';
import { subscribeToNewBlock } from '../common/subscribeToNewBlock';
export function BlockNumbersProvider({ children }) {
    const networks = useReadonlyNetworks();
    const [state, dispatch] = useReducer(blockNumberReducer, {});
    useEffect(() => {
        const onUnmount = Object.entries(networks).map(([chainId, provider]) => subscribeToNewBlock(provider, Number(chainId), dispatch));
        return () => {
            onUnmount.forEach((fn) => fn());
        };
    }, [networks]);
    const debouncedState = useDebounce(state, 100);
    return _jsx(BlockNumbersContext.Provider, { value: debouncedState, children: children });
}
//# sourceMappingURL=provider.js.map