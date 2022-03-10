import { waitUntil } from './waitUntil';
export const getWaitUtils = (hookResult) => {
    const waitForCurrent = async (predicate, step, timeout) => {
        await waitUntil(() => predicate(hookResult.current), step, timeout);
    };
    const waitForCurrentEqual = async (value, step, timeout) => {
        await waitForCurrent((val) => val === value, step, timeout);
    };
    return {
        waitForCurrent,
        waitForCurrentEqual,
    };
};
//# sourceMappingURL=waitUtils.js.map