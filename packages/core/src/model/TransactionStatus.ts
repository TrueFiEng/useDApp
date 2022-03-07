import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'

export type TransactionState = 'None' | 'PendingSignature' | 'Mining' | 'Success' | 'Fail' | 'Exception'

export interface TransactionStatus {
  status: TransactionState
  transaction?: TransactionResponse
  receipt?: TransactionReceipt
  chainId?: number
  errorMessage?: string
  originalTransaction?: TransactionResponse
}

export function transactionErrored(transaction: TransactionStatus) {
  return 'errorMessage' in transaction
}
