import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MULTICALL_ADDRESSES } from '../constants';
import { ConfigProvider } from '../providers/config/provider';
import { BlockNumberProvider } from './blockNumber/provider';
import { ChainStateProvider } from './chainState';
import { useConfig } from './config/context';
import { EthersProvider } from './EthersProvider';
import { NotificationsProvider } from './notifications/provider';
import { NetworkActivator } from './NetworkActivator';
import { TransactionProvider } from './transactions/provider';
import { LocalMulticallProvider } from './LocalMulticallProvider';
export function DAppProvider({ config, children }) {
    return (_jsx(ConfigProvider, Object.assign({ config: config }, { children: _jsx(DAppProviderWithConfig, { children: children }, void 0) }), void 0));
}
function DAppProviderWithConfig({ children }) {
    const { multicallAddresses } = useConfig();
    const multicallAddressesMerged = Object.assign(Object.assign({}, MULTICALL_ADDRESSES), multicallAddresses);
    return (_jsx(EthersProvider, { children: _jsxs(BlockNumberProvider, { children: [_jsx(NetworkActivator, {}, void 0),
                _jsx(LocalMulticallProvider, { children: _jsx(ChainStateProvider, Object.assign({ multicallAddresses: multicallAddressesMerged }, { children: _jsx(NotificationsProvider, { children: _jsx(TransactionProvider, { children: children }, void 0) }, void 0) }), void 0) }, void 0)] }, void 0) }, void 0));
}
//# sourceMappingURL=DAppProvider.js.map