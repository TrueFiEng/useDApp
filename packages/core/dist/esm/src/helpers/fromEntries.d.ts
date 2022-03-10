/**
 * More strictly typed version of `Object.fromEntries`.
 * Constructs an object from key-value pairs.
 */
export declare function fromEntries<K extends string | number | symbol, V>(entries: [K, V][]): {
    [key in K]: V;
};
//# sourceMappingURL=fromEntries.d.ts.map