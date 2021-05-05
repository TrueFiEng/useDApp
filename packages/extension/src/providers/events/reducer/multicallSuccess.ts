import type { MulticallSuccessMessage } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { timestampToTime } from './timestampToTime'

export function multicallSuccess(state: State, message: MulticallSuccessMessage): State {
  const network = chainIdToNetwork(message.payload.chainId)
  return {
    ...state,
    state: {
      ...state.state,
      [network]: message.payload.state,
    },
    events: [
      ...state.events,
      {
        type: 'STATE_UPDATED',
        time: timestampToTime(message.timestamp),
        blockNumber: message.payload.blockNumber,
        duration: message.payload.duration,
        multicallAddress: message.payload.multicallAddress,
        network: network,
        state: message.payload.state,
      },
    ],
  }
}
