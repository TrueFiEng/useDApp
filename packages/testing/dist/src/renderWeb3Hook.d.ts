import { MockProvider } from '@ethereum-waffle/provider';
import React from 'react';
export interface renderWeb3HookOptions<Tprops> {
    mockProvider?: MockProvider;
    mockProviderOptions?: {
        pollingInterval?: number;
    };
    renderHook?: {
        initialProps?: Tprops;
        wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>;
    };
}
export declare const renderWeb3Hook: <Tprops, TResult>(hook: (props: Tprops) => TResult, options?: renderWeb3HookOptions<Tprops> | undefined) => Promise<{
    waitForCurrent: (predicate: (value: TResult) => boolean, step?: number | undefined, timeout?: number | undefined) => Promise<void>;
    waitForCurrentEqual: (value: TResult, step?: number | undefined, timeout?: number | undefined) => Promise<void>;
    result: import("@testing-library/react-hooks").RenderResult<TResult>;
    provider: MockProvider;
    mineBlock: () => Promise<void>;
    rerender: (props?: Tprops | undefined) => void;
    unmount: () => void;
}>;
//# sourceMappingURL=renderWeb3Hook.d.ts.map