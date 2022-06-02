import { BlockTag } from '@ethersproject/abstract-provider'
import { Config } from '..'
import { ChainId } from '../chainId'

/**
 * Options for queries.
 * @public
 */
export interface QueryParams {
  /**
   * ChainId of the chain you want to perform the query on.
   * @default {} The chainId of the connected wallet.
   */
  chainId?: ChainId
  isStatic?: boolean
  refresh?: Config['refresh']
}

/**
 * Options for log queries. If `blockHash` is defined and is not empty, it'll take precedence over `fromBlock` and
 * `toBlock`.
 */
export interface LogQueryParams extends QueryParams {
  /**
   * The starting block (inclusive) to search for logs matching the filter criteria.
   * @default 0 The genesis block.
   *
   * See {@link BlockTag} and {@link https://docs.ethers.io/v5/api/providers/types/#providers-Filter}
   */
  fromBlock?: BlockTag

  /**
   * The end block (inclusive) to search for logs matching the filter criteria.
   * @default 'latest' The latest block.
   *
   * See {@link BlockTag} and {@link https://docs.ethers.io/v5/api/providers/types/#providers-Filter}
   */
  toBlock?: BlockTag

  /**
   * The specific block (by its block hash) to search for logs matching the filter criteria.
   * @default undefined Doesn't query by block hash.
   *
   * See {@link https://docs.ethers.io/v5/api/providers/types/#providers-FilterByBlockHash}
   */
  blockHash?: string
}
