import { useMemo } from 'react'
import { useNotificationsContext } from '../providers'
import { useEthers } from './useEthers'

export function useNotifications() {
  const { chainId, account } = useEthers()
  const { addNotification, notifications } = useNotificationsContext()

  const chainNotifications = useMemo(() => {
    if (chainId === undefined || !account) {
      return []
    }
    return notifications[chainId] ?? []
  }, [notifications, chainId, account])

  return {
    notifications: chainNotifications,
    addNotification,
  }
}
