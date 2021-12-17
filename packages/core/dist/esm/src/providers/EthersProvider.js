import { jsx as _jsx } from "react/jsx-runtime";
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
const DEFAULT_POLLING_INTERVAL = 15000;
export function EthersProvider({ children, pollingInterval }) {
    function getLibrary(provider) {
        const library = new Web3Provider(provider, 'any');
        library.pollingInterval = pollingInterval || DEFAULT_POLLING_INTERVAL;
        return library;
    }
    return _jsx(Web3ReactProvider, Object.assign({ getLibrary: getLibrary }, { children: children }), void 0);
}
//# sourceMappingURL=EthersProvider.js.map