import { useMemo } from 'react'
import { Contract } from 'ethers'
import { ContractMethodNames, Falsy, Params, TypedContract } from '../model/types'
import { useRawCalls } from './useRawCalls'
import { CallResult, decodeCallResult, encodeCallData } from '../helpers'
import { QueryParams } from '../constants/type/QueryParams'
import { useChainId } from './useChainId'
import { useConfig } from './useConfig'

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
 * A syntax sugar for {@link useRawCall} that uses ABI, function name, and arguments instead of raw data.
 * If typechain contract is used in `call` parameter then method name and arguments will be type checked.
 * Result will be typed as well.
 *
 * More on type checking [here](https://usedapp-docs.netlify.app/docs/Guides/Reading/Typechain).
 *
 * @public
 * @param call a single call to a contract, also see {@link Call}
 * @returns The hook returns {@link CallResult} type.
 *
 * @example
 * function useTotalSupply(tokenAddress: string | undefined): BigNumber | undefined {
 *    const { value, error } = useCall(tokenAddress && {
 *      contract: new Contract(tokenAddress, ERC20Interface),
 *      method: 'totalSupply',
 *      args: []
 *    }) ?? {}
 *    if(error) {
 *      console.error(error.message)
 *      return undefined
 *    }
 *    return value?.[0]
 * }
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
 * A syntax sugar for {@link useRawCalls} that uses ABI, function name, and arguments instead of raw data.
 * @public
 * @param calls a list of contract calls, also see {@link Call}.
 * @param queryParams see {@link QueryParams}.
 * @returns a list of results (see {@link CallResult}).
 *
 * @example
 * function useTotalSupplies(tokenAddresses: string[] | undefined): (BigNumber | undefined)[] {
 *   const calls = tokenAddresses?.map(address => ({
 *     contract: new Contract(address, ERC20Interface),
 *     method: 'totalSupply',
 *     args: []
 *   })) ?? []
 *   const results = useCalls(calls) ?? []
 *   results.forEach((result, idx) => {
 *     if(result && result.error) {
 *       console.error(`Error encountered calling 'totalSupply' on ${calls[idx]?.contract.address}: ${result.error.message}`)
 *     }
 *   })
 *   return results.map(result => result?.value?.[0])
 * }
 */
export function useCalls(calls: (Call | Falsy)[], queryParams: QueryParams = {}): CallResult<Contract, string>[] {
  const chainId = useChainId({ queryParams })
  const { refresh } = useConfig()

  const potentialRawCalls = useMemo(
    () =>
      calls.map((call) =>
        chainId !== undefined
          ? encodeCallData(call, chainId, { ...queryParams, refresh: queryParams.refresh ?? refresh })
          : undefined
      ),
    [
      JSON.stringify(
        calls.map(
          (call) => call && { address: call.contract.address.toLowerCase(), method: call.method, args: call.args }
        )
      ),
      chainId,
    ]
  )

  const rawCalls = useMemo(
    () => potentialRawCalls.map((potentialCall) => (potentialCall instanceof Error ? undefined : potentialCall)),
    [potentialRawCalls]
  )

  const results = useRawCalls(rawCalls)
  return useMemo(
    () =>
      results.map((result, idx) => {
        if (potentialRawCalls[idx] instanceof Error) {
          return { value: undefined, error: potentialRawCalls[idx] as Error }
        }
        return decodeCallResult(calls[idx], result)
      }),
    [results]
  )
}
