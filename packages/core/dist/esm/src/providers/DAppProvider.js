import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ConfigProvider } from './config';
import { BlockNumberProvider } from './blockNumber/blockNumber';
import { MultiChainStateProvider } from './chainState';
import { useConfig } from './config/context';
import { NotificationsProvider } from './notifications/provider';
import { NetworkActivator } from './NetworkActivator';
import { TransactionProvider } from './transactions/provider';
import { LocalMulticallProvider } from './LocalMulticallProvider';
import { NetworkProvider, InjectedNetworkProvider, ReadonlyNetworksProvider } from './network';
import { BlockNumbersProvider } from './blockNumber/blockNumbers';
export function DAppProvider({ config, children }) {
    return (_jsx(ConfigProvider, Object.assign({ config: config }, { children: _jsx(DAppProviderWithConfig, { children: children }) })));
}
const getMulticallAddresses = (networks) => {
    const result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach((network) => (result[network.chainId] = network.multicallAddress));
    return result;
};
const getMulticall2Addresses = (networks) => {
    const result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach((network) => {
        if (network.multicall2Address) {
            result[network.chainId] = network.multicall2Address;
        }
    });
    return result;
};
function DAppProviderWithConfig({ children }) {
    const { multicallAddresses, networks, multicallVersion } = useConfig();
    const defaultAddresses = useMemo(() => (multicallVersion === 1 ? getMulticallAddresses(networks) : getMulticall2Addresses(networks)), [networks, multicallVersion]);
    const multicallAddressesMerged = Object.assign(Object.assign({}, defaultAddresses), multicallAddresses);
    return (_jsx(ReadonlyNetworksProvider, { children: _jsx(NetworkProvider, { children: _jsx(InjectedNetworkProvider, { children: _jsx(BlockNumberProvider, { children: _jsxs(BlockNumbersProvider, { children: [_jsx(NetworkActivator, {}), _jsx(LocalMulticallProvider, { children: _jsx(MultiChainStateProvider, Object.assign({ multicallAddresses: multicallAddressesMerged }, { children: _jsx(NotificationsProvider, { children: _jsx(TransactionProvider, { children: children }) }) })) })] }) }) }) }) }));
}
//# sourceMappingURL=DAppProvider.js.map