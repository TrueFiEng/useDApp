import { useMemo } from 'react'
import { Notification, useNotificationsContext } from '../providers'
import { useEthers } from './useEthers'
import { useInterval } from './useInterval'
import { useConfig } from '../providers/config/context'

function getExpiredNotifications(notifications: Notification[], expirationPeriod: number) {
  const timeFromCreation = (creationTime: number) => Date.now() - creationTime

  return notifications.filter((notification) => timeFromCreation(notification.submittedAt) >= expirationPeriod)
}

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
