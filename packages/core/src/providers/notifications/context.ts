import { createContext, useContext } from 'react'
import { Notifications, DEFAULT_NOTIFICATIONS, AddNotificationPayload, RemoveNotificationPayload } from './model'

export const NotificationsContext = createContext<{
  notifications: Notifications
  addNotification: (payload: AddNotificationPayload) => void
  removeNotification: (payload: RemoveNotificationPayload) => void
}>({
  notifications: DEFAULT_NOTIFICATIONS,
  addNotification: () => undefined,
  removeNotification: () => undefined,
})

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useNotificationsContext() {
  return useContext(NotificationsContext)
}
