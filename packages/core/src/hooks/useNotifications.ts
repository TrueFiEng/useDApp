import { useMemo } from 'react'
import { Notification, useNotificationsContext } from '../providers'
import { useEthers } from './useEthers'
import { useInterval } from './useInterval'
import { useConfig } from '../hooks'

function getExpiredNotifications(notifications: Notification[], expirationPeriod: number) {
  if (expirationPeriod === 0) {
    return []
  }
  const timeFromCreation = (creationTime: number) => Date.now() - creationTime

  return notifications.filter((notification) => timeFromCreation(notification.submittedAt) >= expirationPeriod)
}

/**
 * ``useNotifications`` is a hook that is used to access notifications.
 * Notifications include information about: new transactions, transaction success or failure, as well as connection to a new wallet.
 *
 * To use this hook call:
 *
 * ```tsx
 *   const { notifications } = useNotifications()
 * ```
 *
 * `notifications` is an array of `NotificationPayload`.
 *
 * Each notification is removed from `notifications` after time declared in
 * `config.notifications.expirationPeriod`
 *
 * Each can be one of the following:
 *
 * ```tsx
 *   {
 *     type: 'walletConnected';
 *     address: string
 *   }
 * ```
 *
 * ```tsx
 *   {
 *     type: 'transactionStarted';
 *     submittedAt: number
 *     transaction: TransactionResponse;
 *     transactionName?: string
 *   }
 * ```
 *
 * ```tsx
 *   {
 *     type: 'transactionSucceed'
 *     transaction: TransactionResponse
 *     originalTransaction?: TransactionResponse
 *     receipt: TransactionReceipt
 *     transactionName?: string
 *   }
 * ```
 *
 * ```tsx
 *   {
 *     type: 'transactionFailed'
 *     transaction: TransactionResponse
 *     originalTransaction?: TransactionResponse
 *     receipt: TransactionReceipt
 *     transactionName?: string
 *   }
 * ```
 *
 * @public
 * @see [Transaction Response](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse)
 * @see [Transaction Receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt)
 */
export function useNotifications() {
  const { chainId, account } = useEthers()
  const { addNotification, notifications, removeNotification } = useNotificationsContext()
  const {
    notifications: { checkInterval, expirationPeriod },
  } = useConfig()

  const chainNotifications = useMemo(() => {
    if (chainId === undefined || !account) {
      return []
    }
    return notifications[chainId] ?? []
  }, [notifications, chainId, account])

  useInterval(() => {
    if (!chainId) {
      return
    }

    const expiredNotification = getExpiredNotifications(chainNotifications, expirationPeriod)
    for (const notification of expiredNotification) {
      removeNotification({ notificationId: notification.id, chainId })
    }
  }, checkInterval)

  return {
    notifications: chainNotifications,
    addNotification,
    removeNotification,
  }
}
