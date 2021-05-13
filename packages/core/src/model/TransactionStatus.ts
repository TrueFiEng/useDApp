import { ChainId } from '../constants'
import {TransactionResponse, TransactionReceipt} from '@ethersproject/abstract-provider'

export type TransactionStatus =
    | {
        status: 'None'
    }
    | {
        status: 'Mining'
        chainId: ChainId
        transaction: TransactionResponse
    }
    | {
        status: 'Success'
        chainId: ChainId
        transaction: TransactionResponse
        receipt: TransactionReceipt
    }
    | {
        status: 'Fail'
        transaction: TransactionResponse
        receipt: TransactionReceipt
        chainId: ChainId
        errorMessage: string
    }
    | {
        status: 'Exception'
        chainId: ChainId
        errorMessage: string
    }