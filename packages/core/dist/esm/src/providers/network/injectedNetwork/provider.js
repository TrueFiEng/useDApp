import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { InjectedNetworkContext } from './context';
import { getInjectedProvider } from '../../../helpers/injectedProvider';
import { useNetwork } from '../network';
import { useConfig } from '../../config';
export function InjectedNetworkProvider({ children }) {
    const { reportError } = useNetwork();
    const { pollingInterval } = useConfig();
    const [injectedProvider, setInjectedProvider] = useState();
    useEffect(function () {
        getInjectedProvider(pollingInterval).then(setInjectedProvider);
    }, []);
    const connect = useCallback(async () => {
        if (!injectedProvider) {
            reportError(new Error('No injected provider available'));
            return;
        }
        try {
            await injectedProvider.send('eth_requestAccounts', []);
            return injectedProvider;
        }
        catch (err) {
            reportError(err);
        }
    }, [injectedProvider]);
    return (_jsx(InjectedNetworkContext.Provider, { value: {
            injectedProvider,
            connect,
        }, children: children }));
}
//# sourceMappingURL=provider.js.map