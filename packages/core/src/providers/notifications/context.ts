import { createContext, useContext } from 'react'
import { Notifications, DEFAULT_NOTIFICATIONS, AddNotificationPayload } from './model'

export const NotificationsContext = createContext<{
  notifications: Notifications
  addNotification: (payload: AddNotificationPayload) => void
}>({
  notifications: DEFAULT_NOTIFICATIONS,
  addNotification: () => undefined,
})

export function useNotificationsContext() {
  return useContext(NotificationsContext)
}
