import { NetworkConnector } from '@web3-react/network-connector';
import { useEffect } from 'react';
import { useEthers } from '../hooks';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useConfig } from './config/context';
export function NetworkActivator() {
    const { activate, account, chainId: connectedChainId, active, connector } = useEthers();
    const { supportedChains, readOnlyChainId, readOnlyUrls } = useConfig();
    useEffect(() => {
        const eagerConnect = async () => {
            const injected = new InjectedConnector({ supportedChainIds: supportedChains });
            if (await injected.isAuthorized()) {
                activate(injected);
            }
        };
        eagerConnect();
    }, []);
    useEffect(() => {
        if (readOnlyChainId && readOnlyUrls) {
            if (!active || (connector instanceof NetworkConnector && connectedChainId !== readOnlyChainId)) {
                activate(new NetworkConnector({ defaultChainId: readOnlyChainId, urls: readOnlyUrls || [] }));
            }
        }
    }, [readOnlyChainId, readOnlyUrls, active, account, connectedChainId, connector]);
    return null;
}
//# sourceMappingURL=NetworkActivator.js.map