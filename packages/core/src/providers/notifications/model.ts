import { TransactionReceipt, TransactionRequest, TransactionResponseParams } from 'ethers'

type NotificationPayload = { submittedAt: number } & (
  | { type: 'transactionPendingSignature'; transactionName?: string; transactionRequest?: TransactionRequest }
  | { type: 'transactionStarted'; transaction: TransactionResponseParams; transactionName?: string }
  | {
      type: 'transactionSucceed'
      transaction: TransactionResponseParams
      receipt: TransactionReceipt
      transactionName?: string
      originalTransaction?: TransactionResponseParams
    }
  | {
      type: 'transactionFailed'
      transaction: TransactionResponseParams
      receipt: TransactionReceipt
      transactionName?: string
      originalTransaction?: TransactionResponseParams
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
  [chainId: number]: Notification[]
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const DEFAULT_NOTIFICATIONS: Notifications = {}
