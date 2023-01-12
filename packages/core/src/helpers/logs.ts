import { utils } from 'ethers'
import type { BlockTag, Filter, FilterByBlockHash, Log } from '@ethersproject/abstract-provider'
import { TypedFilter } from '../hooks/useLogs'
import { Awaited, ContractEventNames, DetailedEventRecord, EventRecord, Falsy, TypedContract } from '../model/types'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function warnOnInvalidFilter(filter: TypedFilter | Falsy) {
  if (!filter) {
    return
  }
  const { contract, event, args } = filter
  console.warn(`Invalid contract filter: address=${contract.address} event=${event} args=${args}`)
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function encodeFilterData(
  filter: TypedFilter | Falsy,
  fromBlock?: BlockTag,
  toBlock?: BlockTag,
  blockHash?: string
): Filter | FilterByBlockHash | Falsy | Error {
  if (!filter) {
    return undefined
  }
  const { contract, event, args } = filter
  if (!contract.address || !event) {
    warnOnInvalidFilter(filter)
    return undefined
  }
  try {
    const encodedTopics = contract.interface.encodeFilterTopics((event as unknown) as utils.EventFragment, args)

    if (blockHash) {
      return {
        address: contract.address,
        topics: encodedTopics,
        blockHash: blockHash,
      } as FilterByBlockHash
    } else {
      return {
        address: contract.address,
        topics: encodedTopics,
        fromBlock: fromBlock ?? 0,
        toBlock: toBlock ?? 'latest',
      } as Filter
    }
  } catch (e) {
    if (e instanceof Error) {
      return e as Error
    } else {
      warnOnInvalidFilter(filter)
      return undefined
    }
  }
}

/**
 * Result of a {@link useLogs} query.
 *
 * It is `undefined` when the query didn't return yet or one of the following objects:
 *
 * - `{ value: DetailedEventRecord[], error: undefined }`, if the query succeeded,
 * - `{ value: undefined, error: Error }`, if the query failed.
 *
 * Type `DetailedEventRecord` represents a single event (log) on a typed contract:
 *
 * ```typescript
 * type DetailedEventRecord<T extends TypedContract, EN extends ContractEventNames<T>> = {
 *   data: EventRecord<T, EN>
 *   blockNumber: number
 *   blockHash: string
 *   transactionIndex: number
 *   transactionHash: string
 *   removed: boolean
 * }
 * ```
 *
 * Additional resources related to events can be found [here](https://docs.soliditylang.org/en/latest/abi-spec.html#events).
 *
 * @public
 */
export type LogsResult<T extends TypedContract, EN extends ContractEventNames<T>> =
  | { value: Awaited<DetailedEventRecord<T, EN>>[]; error: undefined }
  | { value: undefined; error: Error }
  | undefined

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function decodeLogs<T extends TypedContract, EN extends ContractEventNames<T>>(
  filter: TypedFilter | Falsy,
  result: Log[] | Falsy | Error
): LogsResult<T, EN> {
  if (!result || !filter) {
    return undefined
  }
  try {
    if (result instanceof Error) {
      return {
        value: undefined,
        error: result,
      }
    }

    const decodedLogs: Awaited<DetailedEventRecord<T, EN>>[] = []

    for (const log of result) {
      const data = filter.contract.interface.decodeEventLog(filter.event, log.data, log.topics) as EventRecord<T, EN>

      decodedLogs.push({
        data,
        blockNumber: log.blockNumber,
        blockHash: log.blockHash,
        transactionIndex: log.transactionIndex,
        transactionHash: log.transactionHash,
        removed: log.removed,
      })
    }

    return {
      value: decodedLogs,
      error: undefined,
    }
  } catch (error) {
    return {
      value: undefined,
      error: error as Error,
    }
  }
}
