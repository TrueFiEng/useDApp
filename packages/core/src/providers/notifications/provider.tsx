import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../../hooks'
import { NotificationsContext } from './context'
import { AddNotificationPayload, DEFAULT_NOTIFICATIONS } from './model'
import { notificationReducer } from './reducer'

interface Props {
  children: ReactNode
}

export function NotificationsProvider({ children }: Props) {
  const [storage, setStorage] = useLocalStorage('notifications')
  const [notifications, dispatch] = useReducer(notificationReducer, storage ?? DEFAULT_NOTIFICATIONS)

  useEffect(() => {
    setStorage(notifications)
  }, [notifications])

  const addNotification = useCallback(
    ({ notification, chainId }: AddNotificationPayload) => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        chainId,
        notification,
      })
    },
    [dispatch]
  )

  return <NotificationsContext.Provider value={{ addNotification, notifications }} children={children} />
}
