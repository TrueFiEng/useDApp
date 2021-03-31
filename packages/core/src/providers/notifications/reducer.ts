import { ChainId } from '../../constants'
import { Notification, Notifications } from './model'

interface AddNotification {
  type: 'ADD_NOTIFICATION'
  chainId: ChainId
  notification: Notification
}

type Action = AddNotification

export function notificationReducer(state: Notifications, action: Action): Notifications {
  const { chainId } = action
  const chainState = state[chainId] ?? []

  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        [chainId]: chainState.concat(action.notification),
      }
  }
}
