import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { ChainId } from '../../constants'

interface TransactionStarted {
  type: 'transactionStarted'
  transaction: TransactionResponse
  submittedAt: number
}

interface TransactionSucceed {
  type: 'transactionSucceed'
  transaction: TransactionResponse
  receipt: TransactionReceipt
  submittedAt: number
}

interface TransactionFailed {
  type: 'transactionFailed'
  transaction: TransactionResponse
  receipt: TransactionReceipt
  submittedAt: number
}

interface WalletConnected {
  type: 'walletConnected'
  address: string
  submittedAt: number
}

export type Notification = TransactionStarted | TransactionSucceed | TransactionFailed | WalletConnected

export interface AddNotificationPayload {
  notification: Notification
  chainId: ChainId
}

export type Notifications = {
  [T in ChainId]?: Notification[]
}

export const DEFAULT_NOTIFICATIONS: Notifications = {}
