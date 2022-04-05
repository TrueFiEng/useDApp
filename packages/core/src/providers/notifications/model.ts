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

/**
 * @public
 */
export type Notification = { id: string } & NotificationPayload

/**
 * @public
 */
export type AddNotificationPayload = {
  chainId: number
  notification: NotificationPayload
}

/**
 * @public
 */
export type RemoveNotificationPayload = {
  chainId: number
  notificationId: string
}

/**
 * @public
 */
export type Notifications = {
  [chainID: number]: Notification[]
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const DEFAULT_NOTIFICATIONS: Notifications = {}
