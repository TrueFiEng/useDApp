/* eslint-disable */
import { Contract, ContractTransaction } from "ethers"

export type Falsy = false | 0 | '' | null | undefined

export type TypedContract = Contract & {
    functions: Record<string, (...args: any[]) => any>,
    filters: Record<string, (...args: any[]) => any>
}

export type ContractFunctionNames<T extends TypedContract> = keyof { [P in keyof T['functions'] as ReturnType<T['functions'][P]> extends Promise<ContractTransaction> ? P : never] : void } & string

export type ContractMethodNames<T extends TypedContract> = keyof { [P in keyof T['functions'] as ReturnType<T['functions'][P]> extends Promise<any[]> ? P : never]: void } & string

export type ContractEventNames<T extends TypedContract> = keyof { [P in keyof T['filters']]: void } & string

export type Params<T extends TypedContract, FN extends ContractFunctionNames<T> | ContractMethodNames<T>> = Parameters<T['functions'][FN]>

export type EventParams<T extends TypedContract, EN extends ContractEventNames<T>> = Parameters<T['filters'][EN]>

export type EventRecord<T extends TypedContract, EN extends ContractEventNames<T>> = { [P in keyof EventParams<T, EN> as string]: any }

export type DetailedEventRecord<T extends TypedContract, EN extends ContractEventNames<T>> = {
    data: EventRecord<T, EN>,
    blockNumber: number,
    blockHash: string,
    transactionIndex: number,
    transactionHash: string,
    removed: boolean,
}

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T
