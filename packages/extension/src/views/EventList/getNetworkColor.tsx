import { Colors } from '../../design'
import type { Event } from '../../providers/events/State'

export function getNetworkColor(event: Event) {
  if (event.type === 'INIT' || event.type === 'NETWORK_DISCONNECTED' || !event.network) {
    return 'transparent'
  }
  return (Colors.Network as any)[event.network] ?? Colors.Network.Other
}
