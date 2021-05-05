import type { NetworkChangedMessage } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { timestampToTime } from './timestampToTime'

export function networkChanged(state: State, message: NetworkChangedMessage): State {
  if (message.payload.chainId === undefined) {
    if (state.currentNetwork === undefined) {
      return state
    }
    return {
      ...state,
      currentNetwork: undefined,
      events: [
        ...state.events,
        {
          type: 'NETWORK_DISCONNECTED',
          time: timestampToTime(message.timestamp),
        },
      ],
    }
  }

  const network = chainIdToNetwork(message.payload.chainId)
  if (state.currentNetwork === network) {
    return state
  }

  return {
    ...state,
    currentNetwork: network,
    events: [
      ...state.events,
      {
        type: 'NETWORK_CONNECTED',
        network,
        time: timestampToTime(message.timestamp),
      },
    ],
  }
}
