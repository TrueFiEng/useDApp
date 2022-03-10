import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useConfig } from '../../config';
import { ReadonlyNetworksContext } from './context';
import { fromEntries } from '../../../helpers/fromEntries';
export const getProvidersFromConfig = (readOnlyUrls) => fromEntries(Object.entries(readOnlyUrls).map(([chainId, url]) => [chainId, new JsonRpcProvider(url)]));
export function ReadonlyNetworksProvider({ providerOverrides = {}, children }) {
    const { readOnlyUrls = {} } = useConfig();
    const [providers, setProviders] = useState(() => (Object.assign(Object.assign({}, getProvidersFromConfig(readOnlyUrls)), providerOverrides)));
    useEffect(() => {
        setProviders(Object.assign(Object.assign({}, getProvidersFromConfig(readOnlyUrls)), providerOverrides));
    }, [JSON.stringify(readOnlyUrls)]);
    return _jsx(ReadonlyNetworksContext.Provider, Object.assign({ value: providers }, { children: children }));
}
//# sourceMappingURL=provider.js.map