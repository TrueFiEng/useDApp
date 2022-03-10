import { notifyDevtools } from '../../devtools';
export function performMulticall(provider, multicallExecutor, multicallAddress, blockNumber, uniqueCalls, dispatchState, chainId, reportError) {
    const start = Date.now();
    multicallExecutor(provider, multicallAddress, blockNumber, uniqueCalls)
        .then((state) => {
        dispatchState({ type: 'FETCH_SUCCESS', blockNumber, chainId, state });
        notifyDevtools({
            type: 'MULTICALL_SUCCESS',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            state,
        });
    })
        .catch((error) => {
        reportError(error);
        dispatchState({ type: 'FETCH_ERROR', blockNumber, chainId, error });
        notifyDevtools({
            type: 'MULTICALL_ERROR',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            calls: uniqueCalls,
            error,
        });
    });
}
//# sourceMappingURL=performMulticall.js.map