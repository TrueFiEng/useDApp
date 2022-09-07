import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useEthers } from '../../hooks'
import { NotificationsContext } from './context'
import { AddNotificationPayload, DEFAULT_NOTIFICATIONS, RemoveNotificationPayload } from './model'
import { notificationReducer } from './reducer'
import { useIsMounted } from '../../hooks/useIsMounted'
import { nanoid } from 'nanoid'

interface Props {
  children: ReactNode
}

export function NotificationsProvider({ children }: Props) {
  const [notifications, dispatch] = useReducer(notificationReducer, DEFAULT_NOTIFICATIONS)
  const isMounted = useIsMounted()
  const { chainId, account } = useEthers()

  useEffect(() => {
    if (account && chainId) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        chainId: chainId,
        notification: {
          type: 'walletConnected',
          id: nanoid(),
          submittedAt: Date.now(),
          address: account,
        },
      })
    }
  }, [account, chainId])

  const addNotification = useCallback(
    ({ notification, chainId }: AddNotificationPayload) => {
      if (isMounted()) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          chainId,
          notification: { ...notification, id: nanoid() },
        })
      }
    },
    [dispatch]
  )

  const removeNotification = useCallback(
    ({ notificationId, chainId }: RemoveNotificationPayload) => {
      if (isMounted()) {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
          chainId,
          notificationId,
        })
      }
    },
    [dispatch]
  )

  return (
    <NotificationsContext.Provider value={{ addNotification, notifications, removeNotification }} children={children} />
  )
}
