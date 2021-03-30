import { createContext, useContext } from 'react'
import { Notifications, DEFAULT_NOTIFICATIONS, NotificationToSave } from './model'

export const NotificationsContext = createContext<{
  notifications: Notifications
  addNotification: (notication: NotificationToSave) => void
}>({
  notifications: DEFAULT_NOTIFICATIONS,
  addNotification: () => undefined,
})

export function useNotificationsContext() {
  return useContext(NotificationsContext)
}
