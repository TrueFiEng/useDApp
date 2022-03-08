import { useMemo } from 'react'
import { Contract } from 'ethers'
import { ContractMethodNames, Falsy, Params, TypedContract } from '../model/types'
import { useRawCalls } from './useRawCalls'
import { CallResult, decodeCallResult, encodeCallData } from '../helpers'
import { QueryParams } from '../constants/type/QueryParams'

export interface Call<T extends TypedContract = Contract, MN extends ContractMethodNames<T> = ContractMethodNames<T>> {
  contract: T
  method: MN
  args: Params<T, MN>
}

export function useCall<T extends TypedContract, MN extends ContractMethodNames<T>>(
  call: Call<T, MN> | Falsy
): CallResult<T, MN> {
  return useCalls([call])[0]
}

export function useCalls(calls: (Call | Falsy)[], queryParams: QueryParams = {}): CallResult<Contract, string>[] {
  const rawCalls = calls.map((call) => encodeCallData(call, queryParams.chainId))
  const results = useRawCalls(rawCalls)
  return useMemo(() => results.map((result, idx) => decodeCallResult(calls[idx], result)), [results])
}
