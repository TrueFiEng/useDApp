import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useConfig } from '../providers/config/context';
import { InjectedConnector } from '@web3-react/injected-connector';
export function useEthers() {
    const result = useWeb3React();
    const { networks } = useConfig();
    const activateBrowserWallet = useCallback(async (onError, throwErrors) => {
        const injected = new InjectedConnector({ supportedChainIds: networks === null || networks === void 0 ? void 0 : networks.map((network) => network.chainId) });
        if (onError instanceof Function) {
            await result.activate(injected, onError, throwErrors);
        }
        else {
            await result.activate(injected, undefined, throwErrors);
        }
    }, [networks]);
    return Object.assign(Object.assign({}, result), { activateBrowserWallet });
}
//# sourceMappingURL=useEthers.js.map