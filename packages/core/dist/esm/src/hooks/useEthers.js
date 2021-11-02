import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useConfig } from '../providers/config/context';
import { InjectedConnector } from '@web3-react/injected-connector';
export function useEthers() {
    const result = useWeb3React();
    const { supportedChains } = useConfig();
    const activateBrowserWallet = useCallback(async (onError, throwErrors) => {
        const injected = new InjectedConnector({ supportedChainIds: supportedChains });
        if (onError instanceof Function) {
            await result.activate(injected, onError, throwErrors);
        }
        else {
            await result.activate(injected, undefined, throwErrors);
        }
    }, [supportedChains]);
    return Object.assign(Object.assign({}, result), { activateBrowserWallet });
}
//# sourceMappingURL=useEthers.js.map