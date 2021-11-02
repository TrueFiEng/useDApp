import { createContext, useContext } from 'react';
import { DEFAULT_CONFIG } from '../../model/config/default';
export const ConfigContext = createContext({
    config: DEFAULT_CONFIG,
    updateConfig: () => undefined,
});
export function useConfig() {
    const { config } = useContext(ConfigContext);
    return config;
}
export function useUpdateConfig() {
    const { updateConfig } = useContext(ConfigContext);
    return updateConfig;
}
//# sourceMappingURL=context.js.map