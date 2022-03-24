import { Call } from '../hooks/useCall';
import { Awaited, ContractMethodNames, Falsy, TypedContract } from '../model/types';
import { RawCall, RawCallResult } from '../providers';
export declare function warnOnInvalidCall(call: Call | Falsy): void;
export declare function encodeCallData(call: Call | Falsy, chainId: number): RawCall | Falsy;
export declare function getUniqueCalls(requests: RawCall[]): RawCall[];
export declare type CallResult<T extends TypedContract, MN extends ContractMethodNames<T>> = {
    value: Awaited<ReturnType<T['functions'][MN]>>;
    error: undefined;
} | {
    value: undefined;
    error: Error;
} | undefined;
export declare function decodeCallResult<T extends TypedContract, MN extends ContractMethodNames<T>>(call: Call | Falsy, result: RawCallResult): CallResult<T, MN>;
//# sourceMappingURL=calls.d.ts.map