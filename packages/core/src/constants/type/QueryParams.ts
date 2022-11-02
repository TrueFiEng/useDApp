import { BlockTag } from '@ethersproject/abstract-provider'
import { Config } from '..'
import { ChainId } from '../chainId'

/**
 * Optional overrides for hooks querying the state of the blockchain.
 *
 * @public
 */
export interface QueryParams {
  /**
   * ChainId of the chain you want to perform the query on. Defaults to the chainId of the connected wallet. See {@link ChainId}
   */
  chainId?: ChainId
  /**
   * Whether the query is static (not expected to change between calls). Used for optimizations.
   */
  isStatic?: boolean
  /**
   * Refresh call each time the n-th block is mined.
   */
  refresh?: Config['refresh']
}

/**
 * Extends the [QueryParams](#queryparams) object with parameters related to querying logs (blockchain events).
 * Options for log queries. If `blockHash` is defined and is not empty, it'll take precedence over `fromBlock` and
 * `toBlock`.
 */
export interface LogQueryParams extends QueryParams {
  /**
   * The starting block (inclusive) to search for logs matching the filter criteria.
   *
   * **Default value:** `0` (the genesis block)
   *
   * See {@link https://docs.ethers.io/v5/api/providers/types/#providers-BlockTag} and {@link https://docs.ethers.io/v5/api/providers/types/#providers-Filter}
   */
  fromBlock?: BlockTag

  /**
   * The end block (inclusive) to search for logs matching the filter criteria.
   *
   * **Default value:** `latest` (the latest mined block)
   *
   * See {@link https://docs.ethers.io/v5/api/providers/types/#providers-BlockTag} and {@link https://docs.ethers.io/v5/api/providers/types/#providers-Filter}
   */
  toBlock?: BlockTag

  /**
   * The specific block (by its block hash) to search for logs matching the filter criteria.
   *
   * **Default value:** `undefined` (don't query by block hash)
   *
   * See {@link https://docs.ethers.io/v5/api/providers/types/#providers-FilterByBlockHash}
   */
  blockHash?: string
}
