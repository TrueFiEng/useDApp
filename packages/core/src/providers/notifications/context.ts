import { createContext, useContext } from 'react'
import { Notifications, DEFAULT_NOTIFICATIONS, NotificationWithChainId } from './model'

export const NotificationsContext = createContext<{
  notifications: Notifications
  addNotification: (notication: NotificationWithChainId) => void
}>({
  notifications: DEFAULT_NOTIFICATIONS,
  addNotification: () => undefined,
})

export function useNotificationsContext() {
  return useContext(NotificationsContext)
}
