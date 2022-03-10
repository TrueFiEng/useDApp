import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useReducer, useState } from 'react';
import { NetworkContext } from './context';
import { defaultNetworkState, networksReducer } from './reducer';
import { Web3Provider, Provider } from '@ethersproject/providers';
import { subscribeToProviderEvents } from '../../../helpers/eip1193';
async function tryToGetAccount(provider) {
    try {
        return await provider.getSigner().getAddress();
    }
    catch (err) {
        if (err.code === 'UNSUPPORTED_OPERATION') {
            // readonly provider
            return undefined;
        }
        throw err;
    }
}
export function NetworkProvider({ children }) {
    const [network, dispatch] = useReducer(networksReducer, defaultNetworkState);
    const [onUnsubscribe, setOnUnsubscribe] = useState(() => () => undefined);
    const update = useCallback((newNetwork) => {
        dispatch({ type: 'UPDATE_NETWORK', network: newNetwork });
    }, [network]);
    const reportError = useCallback((error) => {
        console.error(error);
        dispatch({ type: 'ADD_ERROR', error });
    }, []);
    const deactivate = useCallback(() => {
        update({
            accounts: [],
        });
    }, []);
    const onDisconnect = useCallback((error) => {
        deactivate();
        reportError(error);
    }, []);
    const activate = useCallback(async (provider) => {
        var _a;
        const wrappedProvider = Provider.isProvider(provider) ? provider : new Web3Provider(provider);
        try {
            const account = await tryToGetAccount(wrappedProvider);
            const chainId = (_a = (await wrappedProvider.getNetwork())) === null || _a === void 0 ? void 0 : _a.chainId;
            onUnsubscribe();
            const clearSubscriptions = subscribeToProviderEvents(wrappedProvider.provider, update, onDisconnect);
            setOnUnsubscribe(() => clearSubscriptions);
            update({
                provider: wrappedProvider,
                chainId,
                accounts: account ? [account] : [],
            });
        }
        catch (err) {
            reportError(err);
        }
    }, [onUnsubscribe]);
    return _jsx(NetworkContext.Provider, { value: { network, update, activate, deactivate, reportError }, children: children });
}
//# sourceMappingURL=provider.js.map