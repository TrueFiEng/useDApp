import { Colors } from '../../../design'
import type { Event } from '../../../providers/events/State'

export function getNetworkColor(event: Event): string | undefined {
  if (
    event.type === 'INIT' ||
    event.type === 'NETWORK_DISCONNECTED' ||
    event.type === 'ACCOUNT_CONNECTED' ||
    event.type === 'ACCOUNT_DISCONNECTED' ||
    event.type === 'ERROR' ||
    !event.network
  ) {
    return undefined
  }
  return (Colors.Network as any)[event.network] ?? Colors.Network.Other
}
