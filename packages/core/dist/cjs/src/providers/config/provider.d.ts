import { ReactNode } from 'react';
import { Config } from '../../model/config/Config';
interface ConfigProviderProps {
    children: ReactNode;
    config: Config;
}
export declare function ConfigProvider({ config, children }: ConfigProviderProps): JSX.Element;
export {};
//# sourceMappingURL=provider.d.ts.map