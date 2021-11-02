/// <reference types="react" />
import { FullConfig, Config } from '../../model/config/Config';
export declare const ConfigContext: import("react").Context<{
    config: FullConfig;
    updateConfig: (config: Config) => void;
}>;
export declare function useConfig(): FullConfig;
export declare function useUpdateConfig(): (config: Partial<FullConfig>) => void;
//# sourceMappingURL=context.d.ts.map