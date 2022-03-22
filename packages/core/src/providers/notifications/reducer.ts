import { Notification, Notifications } from './model'

interface AddNotification {
  type: 'ADD_NOTIFICATION'
  chainId: number
  notification: Notification
}

interface RemoveNotification {
  type: 'REMOVE_NOTIFICATION'
  chainId: number
  notificationId: string
}

type Action = AddNotification | RemoveNotification

export function notificationReducer(state: Notifications, action: Action): Notifications {
  const { chainId } = action
  const chainState = state[chainId] ?? []

  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        [chainId]: [action.notification, ...chainState],
      }
    case 'REMOVE_NOTIFICATION': {
      return {
        ...state,
        [chainId]: chainState.filter((notification) => notification.id !== action.notificationId),
      }
    }
  }
}
