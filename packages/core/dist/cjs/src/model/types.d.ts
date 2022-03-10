import { Contract, ContractTransaction } from "ethers";
export declare type Falsy = false | 0 | '' | null | undefined;
export declare type TypedContract = Contract & {
    functions: Record<string, (...args: any[]) => any>;
};
export declare type ContractFunctionNames<T extends TypedContract> = keyof {
    [P in keyof T['functions'] as ReturnType<T['functions'][P]> extends Promise<ContractTransaction> ? P : never]: void;
} & string;
export declare type ContractMethodNames<T extends TypedContract> = keyof {
    [P in keyof T['functions'] as ReturnType<T['functions'][P]> extends Promise<any[]> ? P : never]: void;
} & string;
export declare type Params<T extends TypedContract, FN extends ContractFunctionNames<T> | ContractMethodNames<T>> = Parameters<T['functions'][FN]>;
export declare type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
//# sourceMappingURL=types.d.ts.map