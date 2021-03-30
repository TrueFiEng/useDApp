import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useEthers, useLocalStorage } from '../../hooks'
import { NotificationsContext } from './context'
import { DEFAULT_NOTIFICATIONS, Notification, NotificationToSave } from './model'
import { notificationReducer } from './reducer'

interface Props {
  children: ReactNode
}

export function NotificationsProvider({ children }: Props) {
  const { chainId } = useEthers()
  const [storage, setStorage] = useLocalStorage('notifications')
  const [notifications, dispatch] = useReducer(notificationReducer, storage ?? DEFAULT_NOTIFICATIONS)

  useEffect(() => {
    setStorage(notifications)
  }, [notifications])

  const addNotification = useCallback(
    (newNotification: NotificationToSave) => {
      const { chainId, ...notification } = newNotification

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
