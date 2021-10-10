import { ChainId } from '../constants'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'

export type TransactionState = 'None' | 'Mining' | 'Success' | 'Fail' | 'Exception'

export interface TransactionStatus {
  status: TransactionState
  transaction?: TransactionResponse
  receipt?: TransactionReceipt
  chainId?: ChainId
  errorMessage?: string
  originalTransaction?: TransactionResponse
}

export function transactionErrored(transaction: TransactionStatus) {
  return 'errorMessage' in transaction
}
