import { ReactNode } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Providers } from './model';
import { NodeUrls } from '../../../constants';
interface NetworkProviderProps {
    providerOverrides?: Providers;
    children?: ReactNode;
}
export declare const getProvidersFromConfig: (readOnlyUrls: NodeUrls) => {
    [x: string]: JsonRpcProvider;
};
export declare function ReadonlyNetworksProvider({ providerOverrides, children }: NetworkProviderProps): JSX.Element;
export {};
//# sourceMappingURL=provider.d.ts.map