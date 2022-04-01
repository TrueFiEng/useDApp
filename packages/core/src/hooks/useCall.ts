import { useMemo } from 'react'
import { Contract } from 'ethers'
import { ContractMethodNames, Falsy, Params, TypedContract } from '../model/types'
import { useRawCalls } from './useRawCalls'
import { CallResult, decodeCallResult, encodeCallData } from '../helpers'
import { QueryParams } from '../constants/type/QueryParams'
import { useConfig, useNetwork } from '../providers'

/**
 * @public
 */
export interface Call<T extends TypedContract = Contract, MN extends ContractMethodNames<T> = ContractMethodNames<T>> {
  contract: T
  method: MN
  args: Params<T, MN>
}

/**
 * Makes a call to a specific method of a specific contract and returns the value or an error if present.
 * The hook will cause the component to refresh when a new block is mined and the return value changes.
 * A syntax sugar for useRawCall that uses ABI, function name, and arguments instead of raw data.
 * If typechain contract is used in call parameter then method name and arguments will be type checked.
 * Result will be typed as well.
 *
 * @param call a single call to a contract , also see {@link Call}
 * @returns The hook returns {@link CallResult} type.
 *          That is: undefined when call didn't return yet or a object { value | error } if it did,
 *          value: any[] | undefined - array of results or undefined if error occurred,
 *          error: Error | undefined - encountered error or undefined if call was successful.
 */
export function useCall<T extends TypedContract, MN extends ContractMethodNames<T>>(
  call: Call<T, MN> | Falsy,
  queryParams: QueryParams = {}
): CallResult<T, MN> {
  return useCalls([call], queryParams)[0]
}

/**
 * Makes calls to specific methods of specific contracts and returns values or an error if present.
 * The hook will cause the component to refresh when a new block is mined and the return values change.
 * A syntax sugar for useRawCalls that uses ABI, function name, and arguments instead of raw data.
 * @param calls a list of contract calls , also see {@link Call}.
 * @param queryParams see {@link QueryParams}.
 * @returns a list of results (see {@link CallResult} in {@link useCall} above).
 */
export function useCalls(calls: (Call | Falsy)[], queryParams: QueryParams = {}): CallResult<Contract, string>[] {
  const { network } = useNetwork()
  const { readOnlyChainId } = useConfig()
  const chainId = queryParams.chainId ?? network.chainId ?? readOnlyChainId

  const rawCalls = calls.map((call) => (chainId !== undefined ? encodeCallData(call, chainId) : undefined))
  const results = useRawCalls(rawCalls)
  return useMemo(() => results.map((result, idx) => decodeCallResult(calls[idx], result)), [results])
}
