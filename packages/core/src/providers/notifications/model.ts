import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { ChainId } from '../../constants'

type NotificationPayload = { submittedAt: number } & (
  | { type: 'transactionStarted'; transaction: TransactionResponse }
  | { type: 'transactionSucceed'; transaction: TransactionResponse; receipt: TransactionReceipt }
  | { type: 'transactionFailed'; transaction: TransactionResponse; receipt: TransactionReceipt }
  | { type: 'walletConnected'; address: string }
)

export type Notification = { id: string } & NotificationPayload

export type AddNotificationPayload = {
  chainId: ChainId
  notification: NotificationPayload
}

export type Notifications = {
  [T in ChainId]?: Notification[]
}

export const DEFAULT_NOTIFICATIONS: Notifications = {}
