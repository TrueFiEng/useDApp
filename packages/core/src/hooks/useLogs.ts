import { useMemo } from 'react'
import { Contract } from 'ethers'
import { ContractEventNames, Falsy, EventParams, TypedContract } from '../model/types'
import { useRawLogs } from './useRawLogs'
import { LogsResult, decodeLogs, encodeFilterData } from '../helpers'
import { LogQueryParams } from '../constants/type/QueryParams'

/**
 * @public
 */
export interface TypedFilter<
  T extends TypedContract = Contract,
  EN extends ContractEventNames<T> = ContractEventNames<T>
> {
  contract: T
  event: EN
  args: EventParams<T, EN>
}

/**
 * Makes a call to get the logs for a specific contract event and returns the decoded logs or an error if present.
 * The hook will cause the component to refresh when a new block is mined and the returned logs change.
 * A syntax sugar for useRawLogs that uses ABI, event name, and arguments instead of raw data.
 * @param filter an event filter (see {@link TypedFilter})
 * @param queryParams allows for additional configuration of the query (see {@link LogQueryParams})
 * @returns an array of decoded logs (see {@link LogsResult})
 * @public
 */
export function useLogs(filter: TypedFilter | Falsy, queryParams: LogQueryParams = {}): LogsResult<Contract, string> {
  const { fromBlock, toBlock, blockHash } = queryParams

  const rawFilter = useMemo(() => encodeFilterData(filter, fromBlock, toBlock, blockHash), [
    filter,
    fromBlock,
    toBlock,
    blockHash,
  ])
  const result = useRawLogs(rawFilter instanceof Error ? undefined : rawFilter, queryParams)
  return useMemo(() => decodeLogs(filter, rawFilter instanceof Error ? rawFilter : result), [result, filter, rawFilter])
}
