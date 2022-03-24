import { createContext, useContext } from 'react';
import { DEFAULT_CONFIG } from '../../model/config/default';
import { getChainById } from '../../helpers/chain';
export const ConfigContext = createContext({
    config: DEFAULT_CONFIG,
    updateConfig: () => undefined,
});
const validConfigs = (configs) => {
    if (!(configs === null || configs === void 0 ? void 0 : configs.networks) || (configs === null || configs === void 0 ? void 0 : configs.networks.length) === 0) {
        console.warn('No networks or supportedChain configured');
    }
    return configs;
};
export function useConfig() {
    var _a;
    const { config } = useContext(ConfigContext);
    // backward compatible with supportedChains
    if (config.supportedChains) {
        console.warn('supportedChain is deprecated, please pass networks instead');
        const networks = (_a = config.supportedChains) === null || _a === void 0 ? void 0 : _a.map((chainId) => getChainById(chainId));
        return validConfigs(Object.assign(Object.assign({}, config), { networks }));
    }
    return validConfigs(config);
}
export function useUpdateConfig() {
    const { updateConfig } = useContext(ConfigContext);
    return updateConfig;
}
//# sourceMappingURL=context.js.map