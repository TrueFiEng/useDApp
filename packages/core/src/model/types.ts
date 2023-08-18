/* eslint-disable */
import { BaseContract, ContractTransaction } from "ethers"

export type Falsy = false | 0 | '' | null | undefined

export type ContractFunctionNames<T extends BaseContract> = keyof { [K in Parameters<T['interface']['getFunction']>[0] as ReturnType<K extends keyof T ? T[K] extends (...args: any) => any ? T[K] : never : never> extends Promise<ContractTransaction> ? K : never]: void }

export type ContractMethodNames<T extends BaseContract> = keyof { [K in Parameters<T['interface']['getFunction']>[0] as ReturnType<K extends keyof T ? T[K] extends (...args: any) => any ? T[K] : never : never> extends Promise<ContractTransaction> ? never : K]: void }

export type ContractEventNames<T extends BaseContract> = keyof { [K in keyof T['filters']]: void }

export type Params<T extends BaseContract, FN extends ContractFunctionNames<T> | ContractMethodNames<T>> = Parameters<FN extends keyof T ? T[FN] extends (...args: any) => any ? T[FN] : never : never>

export type Results<T extends BaseContract, FN extends ContractMethodNames<T>> = Awaited<ReturnType<FN extends keyof T ? T[FN] extends (...args: any) => any ? T[FN] : never : never>>

export type EventParams<T extends BaseContract, EN extends ContractEventNames<T>> = Parameters<T['filters'][EN]>

export type EventRecord<T extends BaseContract, EN extends ContractEventNames<T>> =  { [P in keyof EventParams<T, EN> as string]: any }

export type DetailedEventRecord<T extends BaseContract, EN extends ContractEventNames<T>> = {
    data: EventRecord<T, EN>,
    blockNumber: number,
    blockHash: string,
    transactionIndex: number,
    transactionHash: string,
    removed: boolean,
}

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T
