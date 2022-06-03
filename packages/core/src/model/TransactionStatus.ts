import { TransactionResponse, TransactionReceipt } from 'ethers'

/**
 * @public
 */
export type TransactionState = 'None' | 'PendingSignature' | 'Mining' | 'Success' | 'Fail' | 'Exception'

/**
 * @public
 */
export interface TransactionStatus {
  status: TransactionState
  transaction?: TransactionResponse
  receipt?: TransactionReceipt
  chainId?: number
  errorMessage?: string
  originalTransaction?: TransactionResponse
}

/**
 * @public
 */
export function transactionErrored(transaction: TransactionStatus) {
  return 'errorMessage' in transaction
}
