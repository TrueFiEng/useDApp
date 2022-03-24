import { useEffect, useState } from 'react';
import { useEthers, useLocalStorage } from '../hooks';
import { useConfig } from './config';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useInjectedNetwork } from './network/injectedNetwork';
export function NetworkActivator({ providerOverride }) {
    const { activate, activateBrowserWallet, chainId: connectedChainId } = useEthers();
    const { readOnlyChainId, readOnlyUrls, autoConnect, pollingInterval } = useConfig();
    const injectedProvider = useInjectedNetwork();
    const [shouldConnectMetamask] = useLocalStorage('shouldConnectMetamask');
    const [readonlyConnected, setReadonlyConnected] = useState(false);
    useEffect(() => {
        if (providerOverride) {
            activate(providerOverride);
        }
    }, [providerOverride]);
    useEffect(() => {
        if (readOnlyChainId && readOnlyUrls && !providerOverride) {
            if (readOnlyUrls[readOnlyChainId] && connectedChainId !== readOnlyChainId) {
                const provider = new JsonRpcProvider(readOnlyUrls[readOnlyChainId]);
                provider.pollingInterval = pollingInterval;
                activate(provider).then(() => setReadonlyConnected(true));
            }
        }
    }, [readOnlyChainId, readOnlyUrls]);
    useEffect(() => {
        shouldConnectMetamask &&
            autoConnect &&
            injectedProvider &&
            !providerOverride &&
            readonlyConnected &&
            activateBrowserWallet();
    }, [readonlyConnected]);
    return null;
}
//# sourceMappingURL=NetworkActivator.js.map