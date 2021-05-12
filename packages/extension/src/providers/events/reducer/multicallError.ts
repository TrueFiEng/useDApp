import type { HookMessage, MulticallErrorPayload } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { offsetToTime } from './time'

export function multicallError(state: State, message: HookMessage<MulticallErrorPayload>): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'FETCH_ERROR',
        time: offsetToTime(state.initTimestamp, message.timestamp),
        blockNumber: message.payload.blockNumber,
        duration: message.payload.duration,
        multicallAddress: message.payload.multicallAddress,
        network: chainIdToNetwork(message.payload.chainId),
        calls: message.payload.calls,
        error: message.payload.error,
      },
    ],
  }
}
