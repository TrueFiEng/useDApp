export declare type RawCallResult = {
    value: string;
    success: boolean;
} | undefined;
export declare type ChainState = {
    [address: string]: {
        [data: string]: RawCallResult;
    } | undefined;
};
//# sourceMappingURL=model.d.ts.map