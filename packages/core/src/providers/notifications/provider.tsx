import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../../hooks'
import { NotificationsContext } from './context'
import { DEFAULT_NOTIFICATIONS, NotificationWithChainId } from './model'
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
    (notificationWithChainId: NotificationWithChainId) => {
      const { chainId, ...notification } = notificationWithChainId

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
