import { useMemo } from 'react'
import { Contract } from 'ethers'
import { ContractMethodNames, Falsy, Params, TypedContract } from '../model/types'
import { useRawCalls } from './useRawCalls'
import { CallResult, decodeCallResult, encodeCallData } from '../helpers'
import { QueryParams } from '../constants/type/QueryParams'
import { useNetwork } from '../providers'

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
  const { network } = useNetwork()
  const chainId = queryParams.chainId ?? network.chainId

  const rawCalls = calls.map((call) => chainId !== undefined ? encodeCallData(call, chainId) : undefined)
  const results = useRawCalls(rawCalls)
  return useMemo(() => results.map((result, idx) => decodeCallResult(calls[idx], result)), [results])
}
