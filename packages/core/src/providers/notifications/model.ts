import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'

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
  chainId: number
  notification: NotificationPayload
}

export type RemoveNotificationPayload = {
  chainId: number
  notificationId: string
}

export type Notifications = {
  [chainID: number]: Notification[]
}

export const DEFAULT_NOTIFICATIONS: Notifications = {}
