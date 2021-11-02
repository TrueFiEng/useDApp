import { RenderResult } from '@testing-library/react-hooks';
export declare const getWaitUtils: <TResult>(hookResult: RenderResult<TResult>) => {
    waitForCurrent: (predicate: (value: TResult) => boolean, step?: number | undefined, timeout?: number | undefined) => Promise<void>;
    waitForCurrentEqual: (value: TResult, step?: number | undefined, timeout?: number | undefined) => Promise<void>;
};
//# sourceMappingURL=waitUtils.d.ts.map