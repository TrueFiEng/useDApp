/// <reference types="react" />
import { FullConfig, Config } from '../../constants';
export declare const ConfigContext: import("react").Context<{
    config: FullConfig;
    updateConfig: (config: Config) => void;
}>;
export declare function useConfig(): FullConfig | Record<string, never>;
export declare function useUpdateConfig(): (config: Partial<FullConfig>) => void;
//# sourceMappingURL=context.d.ts.map