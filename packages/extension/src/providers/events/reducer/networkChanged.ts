import type { HookMessage, NetworkChangedPayload } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { offsetToTime } from './time'

export function networkChanged(state: State, message: HookMessage<NetworkChangedPayload>): State {
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
          time: offsetToTime(state.initTimestamp, message.timestamp),
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
        time: offsetToTime(state.initTimestamp, message.timestamp),
        chainId: message.payload.chainId,
      },
    ],
  }
}
