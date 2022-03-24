import { jsx as _jsx } from "react/jsx-runtime";
import { useReducer } from 'react';
import { DEFAULT_CONFIG } from '../../model/config/default';
import { ConfigContext } from './context';
import { configReducer } from './reducer';
export function ConfigProvider({ config, children }) {
    const [reducedConfig, dispatch] = useReducer(configReducer, Object.assign(Object.assign({}, DEFAULT_CONFIG), config));
    return _jsx(ConfigContext.Provider, { value: { config: reducedConfig, updateConfig: dispatch }, children: children });
}
//# sourceMappingURL=provider.js.map