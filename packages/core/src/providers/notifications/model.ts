import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { ChainId } from '../../constants'

type NotificationPayload = { submittedAt: number } & (
  | { type: 'transactionStarted'; transaction: TransactionResponse; transactionName?: string }
  | {
      type: 'transactionSucceed'
      transaction: TransactionResponse
      receipt: TransactionReceipt
      transactionName?: string
      originalTransaction?: TransactionResponse
    }
  | {
      type: 'transactionFailed'
      transaction: TransactionResponse
      receipt: TransactionReceipt
      transactionName?: string
      originalTransaction?: TransactionResponse
    }
  | { type: 'walletConnected'; address: string }
)

export type Notification = { id: string } & NotificationPayload

export type AddNotificationPayload = {
  chainId: ChainId
  notification: NotificationPayload
}

export type RemoveNotificationPayload = {
  chainId: ChainId
  notificationId: string
}

export type Notifications = {
  [T in ChainId]?: Notification[]
}

export const DEFAULT_NOTIFICATIONS: Notifications = {}
