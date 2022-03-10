export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const waitUntil = async (predicate, step = 100, timeout = 10000) => {
    const stopTime = Date.now() + timeout;
    while (Date.now() <= stopTime) {
        const result = await predicate();
        if (result) {
            return result;
        }
        await sleep(step);
    }
    throw new Error(`waitUntil timed out after ${timeout} ms`);
};
//# sourceMappingURL=waitUntil.js.map