import type { Event } from '../../providers/events/State'

export function getEventLabel(event: Event) {
  switch (event.type) {
    case 'INIT':
      return 'Initialized'
    case 'BLOCK_FOUND':
      return 'Block found'
    case 'NETWORK_CONNECTED':
      return 'Network connected'
    case 'NETWORK_DISCONNECTED':
      return 'Network disconnected'
    case 'CALLS_UPDATED':
      return 'Calls updated'
    case 'STATE_UPDATED':
      return 'State updated'
    case 'FETCH_ERROR':
      return 'Fetch error'
  }
}
