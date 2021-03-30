import { ChainId } from '../../constants'

export interface NotificationToSave {
  type: 'started' | 'failed' | 'confirmed'
  name: string
  hash: string
  timestamp: number
  chainId: ChainId
}

export interface Notification {
  type: 'started' | 'failed' | 'confirmed'
  name: string
  hash: string
  timestamp: number
}

export type Notifications = {
  [T in ChainId]?: Notification[]
}

export const DEFAULT_NOTIFICATIONS: Notifications = {}
