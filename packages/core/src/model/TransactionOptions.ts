import { Signer } from 'ethers'

/**
 * @public
 */
export interface TransactionOptions {
  signer?: Signer
  transactionName?: string
}
