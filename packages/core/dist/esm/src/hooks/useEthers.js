import { useCallback } from 'react';
import { useInjectedNetwork, useNetwork } from '../providers';
import { useLocalStorage } from './useLocalStorage';
export function useEthers() {
    const { network: { provider, chainId, accounts, errors }, deactivate, activate, } = useNetwork();
    const { injectedProvider, connect } = useInjectedNetwork();
    const [, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask');
    const result = {
        connector: undefined,
        library: provider,
        chainId,
        account: accounts[0],
        active: !!provider,
        activate: async (providerOrConnector) => {
            if ('getProvider' in providerOrConnector) {
                console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.');
                await providerOrConnector.activate();
                return activate(await providerOrConnector.getProvider());
            }
            return activate(providerOrConnector);
        },
        deactivate: () => {
            deactivate();
            setShouldConnectMetamask(false);
        },
        setError: () => {
            throw new Error('setError is deprecated');
        },
        error: errors[errors.length - 1],
    };
    const activateBrowserWallet = useCallback(async () => {
        if (!injectedProvider) {
            return;
        }
        await connect();
        await result.activate(injectedProvider);
        setShouldConnectMetamask(true);
    }, [injectedProvider]);
    return Object.assign(Object.assign({}, result), { activateBrowserWallet });
}
//# sourceMappingURL=useEthers.js.map