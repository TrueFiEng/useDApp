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
}
