import { ChainId } from '../constants'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'

export interface TransactionStatus {
    status: 'None' | 'Mining' | 'Success' | 'Fail' | 'Exception'
    transaction ?: TransactionResponse
    receipt ?: TransactionReceipt
    chainId ?: ChainId
    errorMessage ?: string
}