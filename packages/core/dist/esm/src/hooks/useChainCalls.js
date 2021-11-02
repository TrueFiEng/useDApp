import { useContext, useEffect, useMemo } from 'react';
import { ChainStateContext } from '../providers/chainState/context';
export function useChainCalls(calls) {
    const { dispatchCalls, value } = useContext(ChainStateContext);
    useEffect(() => {
        const filteredCalls = calls.filter(Boolean);
        dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls });
        return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls });
    }, [JSON.stringify(calls), dispatchCalls]);
    return useMemo(() => calls.map((call) => { var _a, _b; return call && ((_b = (_a = value === null || value === void 0 ? void 0 : value.state) === null || _a === void 0 ? void 0 : _a[call.address]) === null || _b === void 0 ? void 0 : _b[call.data]); }), [
        JSON.stringify(calls),
        value,
    ]);
}
export function useChainCall(call) {
    return useChainCalls([call])[0];
}
//# sourceMappingURL=useChainCalls.js.map